import { GET_TODO_ITEM_FULFILLED, GET_TODO_ITEM_REJECTED, GET_TODO_ITEM_PENDING } from '../actions/getTodoItemAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case GET_TODO_ITEM_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case GET_TODO_ITEM_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case GET_TODO_ITEM_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
