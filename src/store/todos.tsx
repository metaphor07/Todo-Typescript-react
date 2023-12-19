import { ReactNode, createContext, useContext, useState } from "react";

// here we create type of the children, because of typescript
export type TodosProviderProps = {
    children: ReactNode
}

// Now lets define the types of the element, which are passed in the createContext
export type MyTodo = {
    id:string,
    task: string,
    completed: boolean,
    createdAt: Date
}

export type TodosContext = {
    // we need a array which store all the todo task with its compnents
    todos: MyTodo[];
    handleAddTodo:(task:string)=>void;
    toggleTodoAsCompleted:(id: string)=>void;
    handleDeleteTodo:(id:string)=>void;
}

// *** create Context ***
export const todosContext = createContext<TodosContext | null>(null);

// *** Provider ***
export const TodosProvider = ({children}:TodosProviderProps)=>{

    const [todos, setTodos] = useState<MyTodo[]>(()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as MyTodo[]
        } catch (error) {
            return []
        }
    });

    const handleAddTodo = (task:string)=>{

        setTodos((prev)=>{
            const newTodos:MyTodo[] = [
                {
                    id:Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            // store on the local storage
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }

    // mark as a completed
const toggleTodoAsCompleted = (id:string) =>{
    setTodos((prev)=> {
        let newTodos = prev.map((todo)=>{
            if(todo.id === id){
                return {...todo, completed:!todo.completed}
            }
            return todo;
        })
         // store on the local storage
         localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos;
    })
}

// Delete the particular todo
const handleDeleteTodo = (id:string) =>{
    setTodos((prev)=>{
        let newTodos = prev.filter((todo)=>{
            return todo.id != id;
        })
         // store on the local storage
         localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos;
    })
}
   return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}


// *** Consumer ***
export const useTodos = () =>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of provider")
    }
    return todosConsumer;
}