import axios from 'axios';

export const COMPLETE_TODO_ITEM_PENDING = "COMPLETE_TODO_ITEM_PENDING";
export const COMPLETE_TODO_ITEM_FULFILLED = "COMPLETE_TODO_ITEM_FULFILLED";
export const COMPLETE_TODO_ITEM_REJECTED = "COMPLETE_TODO_ITEM_REJECTED";

export function completeTodoItem(id, status) {
    return dispatch => {
        dispatch({
            type: "COMPLETE_TODO_ITEM",
            payload: axios.post(`http://localhost:8080/todo/completeTodoItem`, {
                id,
                status
            })
        })
    }
};