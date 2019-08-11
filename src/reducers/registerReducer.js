import { REGISTER_FULFILLED, REGISTER_REJECTED, REGISTER_PENDING } from '../actions/registerAction';

const initialState = {
    fetched: false,
    data: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case REGISTER_PENDING:
            return {
                fetched: false,
                data: null,
                error: null
            }

        case REGISTER_FULFILLED:
            return {
                fetched: true,
                data: action.payload.data,
                error: null
            }

        case REGISTER_REJECTED:
            return {
                fetched: true,
                data: false,
                error: action.payload.response.data.message   
            }
        default:
            return state;
    }
}
