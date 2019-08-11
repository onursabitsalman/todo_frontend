import axios from 'axios';

export const DELETE_TODO_ITEM_PENDING = "DELETE_TODO_ITEM_PENDING";
export const DELETE_TODO_ITEM_FULFILLED = "DELETE_TODO_ITEM_FULFILLED";
export const DELETE_TODO_ITEM_REJECTED = "DELETE_TODO_ITEM_REJECTED";

export function deleteTodoItem(id) {
    return dispatch => {
        dispatch({
            type: "DELETE_TODO_ITEM",
            payload: axios.post(`http://localhost:8080/todo/deleteTodoItem`, {
                id
            })
        })
    }
};