import * as Types from "./types"

// const todo = {
//     id, title, completed
// }

export function addTodo(title){
    return {
        type: Types.ADD_TODO,
        payload: { title }
    }
}

export function updateTodoTitle(id, title){
    return {
        type: Types.UPDATE_TODO_TITLE,
        payload: { id, title }
    }
}

export function updateTodoStatus(id, status){
    return {
        type: Types.UPDATE_TODO_STATUS,
        payload: { id, status }
    }
}

export function removeTodo(id){
    return {
        type: Types.REMOVE_TODO,
        payload: { id }
    }
}