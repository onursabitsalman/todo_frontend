import { GET_TODO_LIST_FULFILLED, GET_TODO_LIST_REJECTED, GET_TODO_LIST_PENDING } from '../actions/getTodoListAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case GET_TODO_LIST_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case GET_TODO_LIST_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case GET_TODO_LIST_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
