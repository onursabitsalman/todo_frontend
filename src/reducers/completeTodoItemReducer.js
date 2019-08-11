import { COMPLETE_TODO_ITEM_FULFILLED, COMPLETE_TODO_ITEM_REJECTED, COMPLETE_TODO_ITEM_PENDING } from '../actions/completeTodoItemAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case COMPLETE_TODO_ITEM_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case COMPLETE_TODO_ITEM_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case COMPLETE_TODO_ITEM_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
