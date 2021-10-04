import React, { useState } from 'react';

import { ITodo, ITodoState, TodoStateData } from './TodoCreater'
import './App.css';
import { useRecoilState } from 'recoil';


export const TodoDetail = () => {

    const [ todoState,  setTodoState ]  = useRecoilState(TodoStateData); 
    const [ todoItem_temp, setTodoItem_temp ] = useState<ITodo>({
      content : '',
      status : ''
    });
    
    const todoItem : ITodo | undefined = todoState.todos.find(item => item.id === todoState.selectedId);


    const handlerUpdateTodo = (todo? : ITodo) => {
      updateTodo(todo)
      setTodoItem_temp({
        content :  '',
        status : ''
      })
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

    const onChangeContent = (value : string) => {
      setTodoItem_temp({...todoItem_temp, id : todoItem?.id, content : value, status : todoItem?.status || ''});
    }

  return (
    <div className="main-item3">
      <span>
        ID : <input value={todoItem?.id}></input>
        <br/>
        할 일 : <input value={todoItem_temp?.content || todoItem?.content} onChange={e => onChangeContent(e.target.value)}></input>
        <br/>
        상 태 : 
        <select  value={todoItem_temp?.status || todoItem?.status} onChange={e => setTodoItem_temp({...todoItem_temp, id : todoItem?.id, content : todoItem?.content || '', status : e.target.value})}>
          <option value="대기">대기</option>
          <option value="진행">진행</option>
          <option value="완료">완료</option>
        </select>
      </span>
      <br/>
      <button onClick={() => handlerUpdateTodo(todoItem_temp)}>수정</button>
    </div>
  )

}


