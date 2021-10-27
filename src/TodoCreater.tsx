import React, { useState } from 'react';
import { useTodo, todoStateData } from './TodoData';
import './App.css';
import { useRecoilState } from 'recoil';



export const TodoCreater = () => {
  const [ content , setContent ] = useState<string>('');
  const { addTodo } = useTodo();
  return (
    <div className="main-item1">
      <input value={content} onChange={e => setContent(e.target.value)}></input>
      <button onClick={() => addTodo(content)}>할 일 추가</button>
    </div>
  )
}