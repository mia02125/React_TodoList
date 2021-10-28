import React, { Fragment, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import './App.css';

class IdGenerator {
  private static id : number = 0;
  public static new() {
    return IdGenerator.id++;
  }
}
export interface ITodo {
  id? : number
  content : string
  status : string
}
export interface ITodoState {
  todos : ITodo[]
  selectedId? : number
}
export const todoStateData = atom<ITodoState>({
  key : 'TodoListItemData',
  default : {
      todos : [], 
      selectedId : 0  
    }
});

export function useTodo() { 

  const [ todoState, setTodoState ] = useRecoilState(todoStateData);

  const addTodo = (value : string, id? : number) => {
    const addTodoItem : ITodoState = {
      todos : [...todoState.todos, { id : id ?? IdGenerator.new(), content : value, status : '대기' }]
    }
    setTodoState(addTodoItem);
  }
  
  const updateTodo = (content : string, status : string, updateId? : number) => {
    const updateTodoItem : ITodoState = {
      todos : todoState.todos.map((item : ITodo) => {
        return item.id === updateId ? {...item, content : content ?? '', status : status ?? ''} : {...item}
      })
    }
    setTodoState(updateTodoItem);
  }

  const deleteTodo = (id? : number) => {
    const deletedData : ITodoState = {
      todos : todoState.todos.filter(item => { 
        return item.id !== id;
      }),
    }
    setTodoState(deletedData);
  }

  return {
    addTodo,
    updateTodo,
    deleteTodo
  }
}