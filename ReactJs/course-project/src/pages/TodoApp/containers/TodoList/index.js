import { useCallback, useContext, useState } from "react"
import TodosContext from "../../../../state/todo/Context"
import FilterContext from "../../../../state/filter/Context"
import TodoItem from "./components/TodoItem"
import * as TodosActions from "../../../../state/todo/actions"
import styles from "./TodoList.module.css"
import TodoModal from "./components/TodoModal"

const filteredList = (todoList, todoFilter) => {
    switch(todoFilter){
        case "all":
            return todoList;
        case "active":
            return todoList.filter(t => t.completed === false)
        case "completed":
            return todoList.filter(t => t.completed === true)
        default:
            throw new Error("Erro! Filtro não encontrado.")
    }
}

export default function TodoList(){
    const { todos, dispatchToTodos } = useContext(TodosContext)

    const handleDelete = useCallback((id) => {
        dispatchToTodos(TodosActions.removeTodo(id))
    }, [dispatchToTodos])
    const handleStatusUpdate = useCallback((id, completed) => {
        dispatchToTodos(TodosActions.updateTodoStatus(id, completed))
    }, [dispatchToTodos])
    const handleTitleUpdate = useCallback((id, title) => {
        dispatchToTodos(TodosActions.updateTodoTitle(id, title))
    }, [dispatchToTodos])

    const [currentIdModal, setCurrentIdModal] = useState(null)

    const handleModalOpen = useCallback((id) => {
        setCurrentIdModal(id)
    }, [setCurrentIdModal])
    const handleModalClose = useCallback(() => {
        setCurrentIdModal(null)
    }, [setCurrentIdModal])
    const getTitleById = useCallback((id) => {
        let currentTodo = todos.find(todo => todo.id === id);
        return currentTodo ? currentTodo.title : ""
    }, [todos])

    const { filter } = useContext(FilterContext)

    return (
        <div className={styles.container}>
            <ul>
            {
                todos && todos.length > 0 && filter &&
                filteredList(todos, filter).map(todo => {
                    return (
                        <TodoItem 
                            key={todo.id} 
                            id={todo.id}
                            title={todo.title} 
                            completed={todo.completed}
                            // A função é executada diretamente daqui, quando chamada no component
                            onDelete={() => handleDelete(todo.id)}
                            // É passada sendo não executada, pois não possui todos os parâmetros
                            onStatusUpdate={handleStatusUpdate}
                            onModalOpen={handleModalOpen}
                        />
                    )
                })
            }

            {
                currentIdModal &&
                <TodoModal 
                    id={currentIdModal}
                    findTitle={getTitleById}
                    onModalClose={handleModalClose} 
                    onTitleUpdate={handleTitleUpdate} 
                />
            }
        </ul>
        </div>
    )
}