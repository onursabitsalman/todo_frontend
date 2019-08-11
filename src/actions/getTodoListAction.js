import axios from 'axios';

export const GET_TODO_LIST_PENDING = "GET_TODO_LIST_PENDING";
export const GET_TODO_LIST_FULFILLED = "GET_TODO_LIST_FULFILLED";
export const GET_TODO_LIST_REJECTED = "GET_TODO_LIST_REJECTED";

export function getTodoList(userId) {
    return dispatch => {
        dispatch({
            type: "GET_TODO_LIST",
            payload: axios.post(`http://localhost:8080/todo/getTodoList`, {
                userId
            })
        })
    }
};