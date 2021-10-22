import React, { useState } from 'react';
import { addTodo } from './TodoData';
import './App.css';



export const TodoCreater = () => {

  const [ content , setContent ] = useState<string>('');

  return (
    <div className="main-item1">
      <input value={content} onChange={e => setContent(e.target.value)}></input>
      <button onClick={() => addTodo(content)}>할 일 추가</button>
    </div>
  )
}