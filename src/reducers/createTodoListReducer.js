import { CREATE_TODO_LIST_FULFILLED, CREATE_TODO_LIST_REJECTED, CREATE_TODO_LIST_PENDING } from '../actions/createTodoListAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case CREATE_TODO_LIST_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case CREATE_TODO_LIST_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case CREATE_TODO_LIST_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
