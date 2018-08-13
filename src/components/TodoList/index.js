// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getTodosQuery } from '../../graphql/queries';

// ui
import { Input, Checkbox } from 'antd';
import style from './TodoList.module.styl';

export default class TodoList extends Component<{}> {
  render() {
    return (
      <div className={style.TodoList}>
        <div className={style.TodoList__list_wrap}>
          <Query query={getTodosQuery} pollInterval={2000}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              const todos = [...data.getTodo.todos].reverse();
              return todos.map(todo => (
                <div key={todo.id}>
                  <Checkbox checked={todo.done} />
                  {todo.title}
                </div>
              ));
            }}
          </Query>
        </div>

        <div className={style.TodoList__footer}>
          <Input.Search
            placeholder={'Enter todo name'}
            enterButton="+ Add todo"
          />
        </div>
      </div>
    );
  }
}
