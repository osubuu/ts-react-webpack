import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// this is an ALIAS, sort of a variable name for types in typescript
type FormElement = React.FormEvent<HTMLFormElement>;

// an INTERFACE is when we need to define a new type
// NOTE: previously, naming convention is to put 'I' in front of type name (i.e ITodo)
// NOTE2: interfaces can be extended from another type
interface Todo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  // hooks: [state property, function to update state property]
  // value pased into useState() is the default value
  // NOTE: hooks can only be used in function (stateless) components
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string): void => {
    const newTodos: Todo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const completeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(e): void => setValue(e.target.value)} required />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo: Todo, index: number) => (
          <li key={`item-${todo.text}`}>
            <span style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</span>
            <button
              type="button"
              aria-label="Complete this todo item"
              onClick={(): void => completeTodo(index)}
            >
              {todo.complete ? 'Incomplete' : 'Complete'}
            </button>
            <button
              type="button"
              aria-label="Remove this todo item"
              onClick={(): void => removeTodo(index)}
            >
              Remove item
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

const root = document.getElementById('app-root');

ReactDOM.render(<App />, root);
