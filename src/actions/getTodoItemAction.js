import axios from 'axios';

export const GET_TODO_ITEM_PENDING = "GET_TODO_ITEM_PENDING";
export const GET_TODO_ITEM_FULFILLED = "GET_TODO_ITEM_FULFILLED";
export const GET_TODO_ITEM_REJECTED = "GET_TODO_ITEM_REJECTED";

export function getTodoItem(todoListId) {
    return dispatch => {
        dispatch({
            type: "GET_TODO_ITEM",
            payload: axios.post(`http://localhost:8080/todo/getTodoItem`, {
                todoListId
            })
        })
    }
};