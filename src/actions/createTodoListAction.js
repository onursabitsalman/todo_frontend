import axios from 'axios';

export const CREATE_TODO_LIST_PENDING = "CREATE_TODO_LIST_PENDING";
export const CREATE_TODO_LIST_FULFILLED = "CREATE_TODO_LIST_FULFILLED";
export const CREATE_TODO_LIST_REJECTED = "CREATE_TODO_LIST_REJECTED";

export function createTodoList(userId, name) {
    return dispatch => {
        dispatch({
            type: "CREATE_TODO_LIST",
            payload: axios.post(`http://localhost:8080/todo/createTodoList`, {
                userId,
                name
            })
        })
    }
};