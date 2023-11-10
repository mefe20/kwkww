import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo } from './components/AddTodo';
import { TodoLists } from './components/TodoLists';

const App = () => {
  return (
    <div className="container p-4 mt-2">
      <h2>СПИСОК ЗАДАЧ</h2>
      <AddTodo />
      <TodoLists />
    </div>
  );
}

export default App;