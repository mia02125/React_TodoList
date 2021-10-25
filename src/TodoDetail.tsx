import React, { Fragment, useState } from 'react';
import { ITodo, UpdateTodo, todoStateData, todoItemData } from './TodoData';
import './App.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface IInput { 
  todo? : ITodo;
}
/**
 * Common : Input
 * @param props ITodo
 * @returns 
 */
export const Input = (props : { value? : string }) => {

  const setValue = useSetRecoilState(todoItemData);


  return (
    <Fragment>
      <input value={props.value} onChange={e => setValue({content : e.target.value, status : ''})}></input>
    </Fragment>
  )
}
/**
 * Common : Select
 * @param props ITodo
 * @returns 
 */
export const Select = (props : { value? : string}) => {

  const setValue = useSetRecoilState(todoItemData);

  return (
    <Fragment>
      <select  value={props.value} onChange={e => setValue({content : '', status : e.target.value})}>
        <option value="">선택</option>
        <option value="대기">대기</option>
        <option value="진행">진행</option>
        <option value="완료">완료</option>
      </select>
    </Fragment>
  )
}

export const TodoDetail = () => {

  const todoState = useRecoilValue(todoStateData); 
  const todoItem = todoState.todos.find(item => item.id === todoState.selectedId);
  // input 데이터 
  const inputTodo = useRecoilValue(todoItemData);
  
  return (
    <div className="main-item3">
      <span>
        ID : <span>{todoItem?.id}</span>
        <br/>
        할 일 : <Input value={inputTodo.content || todoItem?.content} />
        <br/>
        상 태 : <Select value={inputTodo.status || todoItem?.status} />
      </span>
      <br/>
      <UpdateTodo todo={inputTodo}/>
    </div>
  )
}


