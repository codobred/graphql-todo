// @flow

import React from 'react';

// GraphQL
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import TodoList from './components/TodoList';

export default () => {
  const client = new ApolloClient({
    uri: process.env.GraphQL_API_URL || 'http://localhost:8080/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <div className={'App'}>
        <TodoList />
      </div>
    </ApolloProvider>
  );
};
