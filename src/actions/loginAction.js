import axios from 'axios';

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_REJECTED = "LOGIN_REJECTED";

export function login({username, password}) {
    return dispatch => {
        dispatch({
            type: "LOGIN",
            payload: axios.post(`http://localhost:8080/user/login`, {
                username,
                password
            })
        })
    }
};