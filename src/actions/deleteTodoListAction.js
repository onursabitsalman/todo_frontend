import axios from 'axios';

export const DELETE_TODO_LIST_PENDING = "DELETE_TODO_LIST_PENDING";
export const DELETE_TODO_LIST_FULFILLED = "DELETE_TODO_LIST_FULFILLED";
export const DELETE_TODO_LIST_REJECTED = "DELETE_TODO_LIST_REJECTED";

export function deleteTodoList(id) {
    return dispatch => {
        dispatch({
            type: "DELETE_TODO_LIST",
            payload: axios.post(`http://localhost:8080/todo/deleteTodoList`, {
                id
            })
        })
    }
};