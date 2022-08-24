import * as Types from "./types"

export default function reducer(state, action){
    switch(action.type){
        case Types.ADD_TODO:{
            // Adiciona um todo, não cria um array novo
            return state.concat({
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }) 
        }

        case Types.UPDATE_TODO_STATUS: {
            return state.map(todo => {
                if(todo.id === action.payload.id){
                    return {...todo, completed: action.payload.status}
                }
                return todo;
            })
        }

        case Types.UPDATE_TODO_TITLE: {
            return state.map(todo => {
                if(todo.id === action.payload.id){
                    return {...todo, title: action.payload.title}
                }
                return todo;
            })
        }

        case Types.REMOVE_TODO: {
            return state.filter(todo => todo.id !== action.payload.id)
        }
            
        default:
            throw new Error()
    }
}