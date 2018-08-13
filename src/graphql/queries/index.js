import gql from 'graphql-tag';

export const getTodosQuery = gql`
  {
    getTodo {
      todos {
        id
        title
        done
      }
    }
  }
`;
