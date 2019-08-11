import axios from 'axios';

export const REGISTER_PENDING = "REGISTER_PENDING";
export const REGISTER_FULFILLED = "REGISTER_FULFILLED";
export const REGISTER_REJECTED = "REGISTER_REJECTED";

export function register({username, password}) {
    return dispatch => {
        dispatch({
            type: "REGISTER",
            payload: axios.post(`http://localhost:8080/user/register`, {
                username,
                password
            })
        })
    }
};