import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
      user {
        name
        email
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>User Name</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        {data.getTodos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
            <td>{todo.user ? todo.user.name : 'N/A'}</td>
            <td>{todo.user ? todo.user.email : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
