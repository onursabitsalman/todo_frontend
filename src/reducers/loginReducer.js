import { LOGIN_FULFILLED, LOGIN_REJECTED, LOGIN_PENDING } from '../actions/loginAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case LOGIN_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case LOGIN_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case LOGIN_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
