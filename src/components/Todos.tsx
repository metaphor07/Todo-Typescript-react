import React from 'react'
import { useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
    const {todos, toggleTodoAsCompleted, handleDeleteTodo} = useTodos();

    const [searchParams] = useSearchParams();

    // to="/?todos=active" the url is thid type, so get data from "todos"
    let todosData = searchParams.get("todos");

    let filterData = todos;

    // when click on Active
    if(todosData === "active"){
        filterData = filterData.filter((task)=> !task.completed)
    }

     // when click on completed
     if(todosData === "completed"){
        filterData = filterData.filter((task)=> task.completed)
    }
    
  return (
    <ul className='main-task'>
      {
        filterData?.map((todo)=>{
            return <li key={todo.id}>
                <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={()=>toggleTodoAsCompleted(todo.id)}/>
                <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                {/* if checked the input checkbox show the delete button */}
                {
                    todo.completed && (
                        <button type='button' onClick={()=> handleDeleteTodo(todo.id)}>Delete</button>
                    )
                }
            </li>
        })
      }
    </ul>
  )
}

export default Todos
