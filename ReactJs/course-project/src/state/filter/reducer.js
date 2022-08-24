import * as Types from "./types"

export default function reducer(state, action){
    switch(action.type){
        case Types.TOGGLE_FILTER:
            return action.payload.filter
        default:
            throw new Error("Erro! Ação de reducer não identificada")
    }
}
