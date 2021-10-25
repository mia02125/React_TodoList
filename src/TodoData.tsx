import React, { Fragment, useState } from 'react';
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
  key : 'TodoListItemData',
  default : {
      todos : [], 
      selectedId : 0  
    }
});

export const todoItemData = atom<ITodo>({
  key : 'todoItem',
  default : {
    content : '',
    status : ''
  }
})

export const AddTodo = (props : { content : string, id? : number}) => {

  const [ todoState, setTodoState ] = useRecoilState(todoStateData);
  
  const handlerAddTodo = (value : string) => {
    const addTodoItem : ITodoState = {
      todos : [...todoState.todos, { id : props.id ?? IdGenerator.new(), content : value, status : '대기' }]
    }
    setTodoState(addTodoItem);
  }

  return (
    <Fragment>
      <button onClick={() => handlerAddTodo(props.content)}>할 일 추가</button>
    </Fragment>
    
  )
}

export const UpdateTodo = (props : {todo? : ITodo}) => {

  const [ todoState, setTodoState ] = useRecoilState(todoStateData);

  const handlerUpdateTodo = (todo? : ITodo) => {
    console.log("updTodo : ", todo);
    const updateTodoItem : ITodoState = {
      todos : todoState.todos.map((item : ITodo) => {
        return item.id === todo?.id ? {...item, content : todo?.content || '', status : todo?.status || ''} : {...item}
      })
    }
    setTodoState(updateTodoItem);
  }

  return (
    <Fragment>
      <button onClick={() => handlerUpdateTodo(props.todo)}>수정</button>
    </Fragment>
  )
}


export const DeleteTodo = (prop : {id? : number}) => {
  
  const [ todoState, setTodoState ] = useRecoilState(todoStateData);

  const handlerDeleteTodo = (id? : number) => {

    const deletedData : ITodoState = {
      todos : todoState.todos.filter(item => { 
        return item.id !== id;
      }),
    }
    setTodoState(deletedData);
  }
  
  return ( 
    <Fragment>
      <button onClick={() => handlerDeleteTodo(prop.id)}>삭제</button>
    </Fragment>
  )
}