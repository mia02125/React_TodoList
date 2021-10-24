import React, { useState } from 'react';
import { AddTodo } from './TodoData';
import './App.css';



export const TodoCreater = () => {

  const [ content , setContent ] = useState<string>('');

  return (
    <div className="main-item1">
      <input value={content} onChange={e => setContent(e.target.value)}></input>
      <AddTodo content={content}/>
    </div>
  )
}