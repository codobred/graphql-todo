import React, { Component } from 'react';
import { Input } from 'antd';

import style from './TodoList.module.styl';

export default class TodoList extends Component {
  render() {
    return (
      <div className={style.TodoList}>
        <div className={style.TodoList__list_wrap}>list</div>
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
