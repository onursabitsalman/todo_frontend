import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import getTodoListReducer from './getTodoListReducer';
import getTodoItemReducer from './getTodoItemReducer';
import deleteTodoListReducer from './deleteTodoListReducer';
import deleteTodoItemReducer from './deleteTodoItemReducer';
import createTodoListReducer from './createTodoListReducer';
import createTodoItemReducer from './createTodoItemReducer';
import completeTodoItemReducer from './completeTodoItemReducer';


export default combineReducers({
    loginReducer,
    registerReducer,
    getTodoListReducer,
    getTodoItemReducer,
    deleteTodoListReducer,
    deleteTodoItemReducer,
    createTodoListReducer,
    createTodoItemReducer,
    completeTodoItemReducer
});