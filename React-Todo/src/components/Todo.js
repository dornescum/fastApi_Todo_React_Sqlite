import React from 'react';
import { Button } from 'react-bootstrap';

const Todo = ({ item, isDone, markTodo, removeTodo }) => {
    return (
        <div className="todo m-2">
      <span style={{ textDecoration: isDone === 1 ? 'line-through' : '' }}>
        {item}
      </span>
            <div>
                <Button variant="outline-success" onClick={markTodo}>
                    ✓
                </Button>{' '}
                <Button variant="outline-danger" onClick={removeTodo}>
                    ✕
                </Button>
            </div>
        </div>
    );
};

export default Todo;
