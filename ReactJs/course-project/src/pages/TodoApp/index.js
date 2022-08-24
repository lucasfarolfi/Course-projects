import TodoCreator from "./containers/TodoCreator"
import TodoList from "./containers/TodoList"
import TodoFilter from "./containers/TodoFilter"

// Camada de Containers - Subcomponentes da página
export default function TodoApp(){
    return (
        <>
            <TodoCreator/>
            <TodoList/>
            <TodoFilter/>
        </>
    )
}