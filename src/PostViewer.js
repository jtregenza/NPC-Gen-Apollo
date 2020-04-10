import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      name
      gender
      race
      profession
      ageRange
      alignment
    }
  }
`;

const rowStyles = (post, canEdit) => canEdit(post)
 ? { cursor: 'pointer', fontWeight: 'normal' }
 : {};
const PostViewer = ({ canEdit, onEdit }) => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Profession</th>
            <th>Age Range</th>
            <th>Alignment</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map(post => (
            <tr
                key={post.id}
                style={rowStyles(post, canEdit)}
                onClick={() => canEdit(post) && onEdit(post)}>
              <td>{post.name}</td>
              <td>{post.gender}</td>
              <td>{post.race}</td>
              <td>{post.profession}</td>
              <td>{post.ageRange}</td>
              <td>{post.alignment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);

PostViewer.defaultProps = {
    canEdit: () => false,
    onEdit: () => null,
    };

    export default PostViewer;