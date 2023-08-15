import {useState, useEffect} from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo";

const URL = 'http://localhost:8000/todos';

function App() {
  const [data, setData]= useState([])
  const [isLoading, setIsLoading] = useState(true);
  let [isDone, setIsDone] = useState(false);



  const getData =async()=>{
    try {
      const res = await fetch(URL);
      const data = await res.json();
      console.log('data : ', data)
      setData(data.todos);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading state to false even in case of an error
    }
  }
  useEffect(()=>{
    getData();
  },[isDone])

  const addTodo = text => {
    const newTodos = [...data, { text }];
    setData(newTodos);
  };

  const markTodo = async (index) => {
    const updatedIsDone = isDone ? 1 : 0;

    try {
      await fetch(`http://localhost:8000/todos/${index}?is_done=${updatedIsDone}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      setIsDone(!isDone);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (index) => {
    try {
      await fetch(`http://localhost:8000/todos/${index}`, {
        method: 'DELETE',
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : data.length > 0 ? (
                data.map((item) => (
                    <Todo
                        key={item.id}
                        item={item.item}
                        isDone={item.isDone}
                        markTodo={() => markTodo(item.id)}
                        removeTodo={() => removeTodo(item.id)}
                    />
                ))
            ) : (
                <p>No todos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;




// function Todo({ todo, index, markTodo, removeTodo }) {
//   return (
//       <div
//           className="todo"
//           key={index}
//       >
//         <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
//         <div>
//           <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
//           <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
//         </div>
//       </div>
//   );
// }
