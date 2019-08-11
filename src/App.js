import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import TodoList from './pages/todoList';
import TodoItem from './pages/todoItem';
import CreateTodoList from './pages/createTodoList';
import CreateTodoItem from './pages/createTodoItem';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/todoList" component={TodoList} />
        <Route exact path="/todoItem" component={TodoItem} />
        <Route exact path="/createTodoList" component={CreateTodoList} />
        <Route exact path="/createTodoItem" component={CreateTodoItem} />
      </div>
    </Router>
  );
}

export default App;
