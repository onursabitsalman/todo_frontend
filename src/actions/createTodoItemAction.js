import axios from 'axios';

export const CREATE_TODO_ITEM_PENDING = "CREATE_TODO_ITEM_PENDING";
export const CREATE_TODO_ITEM_FULFILLED = "CREATE_TODO_ITEM_FULFILLED";
export const CREATE_TODO_ITEM_REJECTED = "CREATE_TODO_ITEM_REJECTED";

export function createTodoItem(todoListId, name, description, deadline, dependedItemId) {
    return dispatch => {
        dispatch({
            type: "CREATE_TODO_ITEM",
            payload: axios.post(`http://localhost:8080/todo/createTodoItem`, {
                todoListId,
                name,
                description,
                deadline,
                dependedItemId
            })
        })
    }
};