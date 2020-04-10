const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { name: "Jon Morten", gender: "Masculine", race: "Human", profession: "Merchant", ageRange: "Elderly", alignment: "Chaotic Good" },
  { name: "Joel Morten", gender: "Masculine", race: "Human", profession: "Merchant", ageRange: "Adult", alignment: "Lawful Good" },
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID
    name: String
    gender: String
    race: String
    profession: String
    ageRange: String
    alignment: String

  }
  type Mutation {
    submitPost(input: PostInput!): Post
  }
  
  input PostInput {
    id: ID
    name: String!
    gender: String!
    race: String!
    profession: String!
    ageRange: String!
    alignment: String!
  }
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  submitPost: ({ input: { id, name, gender, race, profession, ageRange, alignment } }) => {
    const post = { name, gender, race, profession, ageRange, alignment };
    let index = POSTS.length;
  
    if (id != null && id >= 0 && id < POSTS.length) {
      if (POSTS[id].authorId !== authorId) return null;
  
      POSTS.splice(id, 1, post);
      index = id;
    } else {
      POSTS.push(post);
    }
  
    return mapPost(post, index);
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);

