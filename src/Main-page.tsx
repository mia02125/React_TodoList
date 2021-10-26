import React from 'react';
import { atom } from 'recoil';
import './App.css';
import { TodoCreater } from './TodoCreater';
import { TodoList } from './TodoZone';
import { TodoDetail } from './TodoDetail'

function App() {
  
  return (
    <div className='main-container'>
      <TodoCreater />
      <TodoList />
      <TodoDetail /> 
    </div>
  );
}

export default App;
