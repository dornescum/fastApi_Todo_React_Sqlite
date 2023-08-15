import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

function FormTodo({addTodo}) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value) return;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({item: value, isDone: false})
        };
        try {
            const res = await fetch('http://localhost:8000/todos', requestOptions);
            const newData = await res.json();
            console.log('new data form', newData)
            if (newData.todos && newData.todos.length > 0) {
                addTodo(newData.todos[0]);
            }

            setValue("");
            window.location.reload(); // Reload the page

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Add Todo</b></Form.Label>
                <Form.Control
                    type="text"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add new todo"
                />
            </Form.Group>
            <Button variant="primary mb-3 w-100" type="submit">
                Submit
            </Button>
        </Form>


    );
}

export default FormTodo;
