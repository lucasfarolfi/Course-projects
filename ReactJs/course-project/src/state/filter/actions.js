import * as Types from "./types"

export function toggleFilter(filter){
    return {
        type: Types.TOGGLE_FILTER,
        payload: {
            filter
        }
    }
}