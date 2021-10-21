import React, { useState } from 'react';

import { ITodo, ITodoState, todoStateData } from './TodoCreater'
import './App.css';
import { useRecoilState } from 'recoil';

interface IInput { 
  todo? : ITodo
}



/**
 * Common : select
 * @param props ITodo
 * @returns 
 */
const Input = (props : IInput) => {

  const [ todoState,  setTodoState ]  = useRecoilState(todoStateData); 

  const onChangeContent = (e : any) => {
    setTodoState({
      todos : todoState.todos.map((item : ITodo) => {
        return item.id === props.todo?.id ? {...item, content : e.target.value, status : item.status} : {...item}
      })
    });
  }

  return (
    <div>
      <input value={props.todo?.content} onChange={onChangeContent}></input>
    </div>
  )
}
/**
 * Common : Select
 * @param props ITodo
 * @returns 
 */
const Select = (props : IInput) => {
  
  const [ todoState,  setTodoState ]  = useRecoilState(todoStateData); 

  const onChangeStatus = (e : any) => {
    setTodoState({
      todos : todoState.todos.map((item : ITodo) => {
        // id값 조건에 따른 데이터 변경 
        return item.id ===  props.todo?.id ? {...item, content : item.content, status : e.target.value} : {...item}
      })
    })
  }
  return (
    <div>
    <select  value={props.todo?.status} onChange={e => onChangeStatus(e.target.value)}>
      <option value="">선택</option>
      <option value="대기">대기</option>
      <option value="진행">진행</option>
      <option value="완료">완료</option>
    </select>
    </div>
  )
}


export const TodoDetail = () => {

    const [ todoState,  setTodoState ]  = useRecoilState(todoStateData); 
    const todoItem : ITodo | undefined = todoState.todos.find(item => 
                                          item.id === todoState.selectedId);

    const handlerUpdateTodo = (todo? : ITodo) => {
      updateTodo(todo);
    }

    const updateTodo = (todo? : ITodo) => {
      const updateTodoItem : ITodoState = {
        todos : todoState.todos.map((item : ITodo) => {
          // id값 조건에 따른 데이터 변경 
          return item.id === todo?.id ? {...item, content : todo?.content || '', status : todo?.status || ''} : {...item}
        })
      }
      setTodoState(updateTodoItem);
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


