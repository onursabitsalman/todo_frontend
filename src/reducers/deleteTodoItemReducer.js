import { DELETE_TODO_ITEM_FULFILLED, DELETE_TODO_ITEM_REJECTED, DELETE_TODO_ITEM_PENDING } from '../actions/deleteTodoItemAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case DELETE_TODO_ITEM_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case DELETE_TODO_ITEM_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case DELETE_TODO_ITEM_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
