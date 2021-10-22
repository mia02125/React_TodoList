import React, { Fragment, useState } from 'react';
import { ITodo, updateTodo, todoStateData } from './TodoData';
import './App.css';
import { useRecoilState } from 'recoil';

interface IInput { 
  todo? : ITodo;
}



/**
 * Common : Input
 * @param props ITodo
 * @returns 
 */
const Input = (props : IInput) => {

  const [ value, setValue ]  = useState<string>('');

  return (
    <Fragment>
      <input value={value || props.todo?.content} onChange={e => setValue(e.target.value)}></input>
    </Fragment>
  )
}
/**
 * Common : Select
 * @param props ITodo
 * @returns 
 */
const Select = (props : IInput) => {

  const [ status, setStatus ]  = useState<string>('');
  
  return (
    <Fragment>
      <select  value={status || props.todo?.status} onChange={e => setStatus(e.target.value)}>
        <option value="">선택</option>
        <option value="대기">대기</option>
        <option value="진행">진행</option>
        <option value="완료">완료</option>
      </select>
    </Fragment>
  )
}


export const TodoDetail = () => {

    const [ todoState,  setTodoState ]  = useRecoilState(todoStateData); 
    
    const todoItem = todoState.todos.find(item => item.id === todoState.selectedId);
    
    const handlerUpdateTodo = (todo? : ITodo) => {
      console.log(todo);
      updateTodo(todo);
    }

    


  return (
    <div className="main-item3">
      <span>
        ID : <span>{todoItem?.id}</span>
        <br/>
        할 일 : <Input todo={todoItem} />
        <br/>
        상 태 : <Select todo={todoItem}/>
      </span>
      <br/>
      <button onClick={() => handlerUpdateTodo(todoItem)}>수정</button>
    </div>
  )
}


