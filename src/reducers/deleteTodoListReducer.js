import { DELETE_TODO_LIST_FULFILLED, DELETE_TODO_LIST_REJECTED, DELETE_TODO_LIST_PENDING } from '../actions/deleteTodoListAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case DELETE_TODO_LIST_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case DELETE_TODO_LIST_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case DELETE_TODO_LIST_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
