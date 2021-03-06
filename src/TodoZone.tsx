import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ITodo, todoStateData, ITodoState, useTodo } from './TodoData';
import './App.css';






export const TodoList = () => {

  const [ filter, setFilter] = useState<string>('');

  return (
    <div className='main-item2'>
    <div>
      <button onClick={() => setFilter('')}>전체</button>
      <button onClick={() => setFilter('대기')}>대기</button>
      <button onClick={() => setFilter('진행')}>진행</button>
      <button onClick={() => setFilter('완료')}>완료</button>
    </div>
      <FilterList filtered={filter}/>
    </div>    
  )  
}

const FilterList = (prop : {filtered : string}) => {
  
  const todoState = useRecoilValue(todoStateData);

  let filterList : ITodo[] = [];

  if(prop.filtered != '') {
    filterList = todoState.todos.filter(item => {
      return item.status === prop.filtered;
    })
  } else {
    filterList = todoState.todos;
  }
  
  return (
    <div className='main-item2'>
      {filterList.map(item => {
        return <TodoListItem todo={item}/>
      })}
    </div>    
  )  
}

const TodoListItem = (prop : {todo : ITodo}) => {
  
  const [ todoState, setTodoState ] = useRecoilState(todoStateData);
  const { deleteTodo } = useTodo();

  const selectedId = (id? : number) => {
    const selectedData : ITodoState = {
      todos : [...todoState.todos],
      selectedId : id
    }
    setTodoState(selectedData);
  }

  return (
    <div className={todoState.selectedId === prop.todo.id ? 'selected' : ''} >
      <span onClick={() => selectedId(prop.todo.id)}>{prop.todo.id}, {prop.todo.content}, {prop.todo.status}</span>
      <button onClick={() => deleteTodo(prop.todo.id)}>삭제</button>
    </div>
  )
}


