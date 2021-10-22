import React, { useState } from 'react';
import { atom, useRecoilState } from 'recoil';
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
  key : 'TodoListItemDate',
  default : {
      todos : []
      ,selectedId : 0  
    }
});

export const addTodo = (content : string, id? : number) => {

  const [ todoState, setTodoState ] = useRecoilState(todoStateData);
  
  const todoList : ITodoState = {
    todos : [...todoState.todos, { id : id ?? IdGenerator.new(), content : content, status : '대기' }]
  }
  setTodoState(todoList);
}

export const updateTodo = (todo? : ITodo) => {

  const [ todoState, setTodoState ] = useRecoilState(todoStateData);

  const updateTodoItem : ITodoState = {
    todos : todoState.todos.map((item : ITodo) => {
      return item.id === todo?.id ? {...item, content : todo?.content || '', status : todo?.status || ''} : {...item}
    })
  }
  setTodoState(updateTodoItem);
}


export const deleteTodo = (id? : number) => {
  
  const [ todoState, setTodoState ] = useRecoilState(todoStateData);

  const deletedData : ITodoState = {
    todos : todoState.todos.filter(item => { 
      return item.id !== id;
    }),
  }
  setTodoState(deletedData);
}