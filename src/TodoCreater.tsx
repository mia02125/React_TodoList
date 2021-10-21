import React, { useState } from 'react';
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
  key : 'TodoListItemDate',
  default : {
      todos : []
      ,selectedId : 0  
    }
})
export const TodoCreater = () => {

  const [ content , setContent ] = useState<string>('');
  const [ todoState, setTodoState ] = useRecoilState(todoStateData);
  
  const addTodo = (content : string, id? : number) => {
    const todoList : ITodoState = {
      todos : [...todoState.todos, { id : id ?? IdGenerator.new(), content : content, status : '대기' }]
    }
    setTodoState(todoList);
  }

  return (
    <div className="main-item1">
      <input value={content} onChange={e => setContent(e.target.value)}></input>
      <button onClick={() => addTodo(content)}>추가</button>
    </div>
  )
}


