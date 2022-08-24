import React, { useReducer } from "react"
import TodoContext from "./Context"
import todoReducer from "./reducer"

export default function Provider({ children }){
    const [todos, dispatchToTodos] = useReducer(todoReducer, [])

    return <TodoContext.Provider value={{todos, dispatchToTodos}}>
        {children}
    </TodoContext.Provider>
}