import React, { Fragment, useState } from 'react';
import { useTodo, todoStateData, ITodo } from './TodoData';

import './App.css';
import { useRecoilState, useRecoilValue } from 'recoil';

export const TodoDetail = () => {

  const todoState = useRecoilValue(todoStateData); 
  const todoItem = todoState.todos.find(item => item.id === todoState.selectedId);
  const { updateTodo } = useTodo();
  
  const [ updData, setUpdData ] = useState<ITodo>({
    content : '',
    status : ''
  })

  /**
   * Common : Input
   * @param props ITodo
   * @returns 
   */
  const Input = (props : { value? : string }) => {

    const [ content, setContent ] = useState<string>('');

    return (
      <Fragment>
        <input value={content || props.value} onChange={e => setContent(e.target.value)} ></input>
      </Fragment>
    )
  }
  /**
   * Common : Select
   * @param props value
   * @returns 
   * 
   */
  const Select = (props : { value? : string}) => {

    return (
      <Fragment>
        <select  value={props.value}         >
          <option value="">선택</option>
          <option value="대기">대기</option>
          <option value="진행">진행</option>
          <option value="완료">완료</option>
        </select>
      </Fragment>
    )
  }



  return (
    <div className="main-item3">
      <span>
        ID : <span>{todoItem?.id}</span>
        <br/>
        할 일 : <Input value={todoItem?.content} />
        <br/>
        상 태 : <Select value={todoItem?.status} />
      </span>
      <br/>
      <button onClick={() => updateTodo(inputTodoItem)}>수정</button>
    </div>
  )
}


