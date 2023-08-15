# FastAPI_Todo_React_Sqlite

This project combines FastAPI, React, and SQLite to create a simple Todo application.

## Installation

To get started, you need to have Python and Node.js installed on your machine.

1. Install FastAPI and Uvicorn:
2. Run the FastAPI server: <br />
   uvicorn main:app --reload


3. Create the SQLite database table `todos`:

```sql
CREATE TABLE todos (
id INTEGER NOT NULL PRIMARY KEY,
item VARCHAR,
isDone INTEGER
); 
```

### React Todo App
This project includes a simple Todo app built using React. The original source for the React Todo app can be found here. The app has been modified and customized to suit the needs of this project.

### Attribution
The React Todo app used in this project was originally created by shubham1710. It is open-source and has been customized for this project's requirements.
### https://github.com/shubham1710/React-Todo/tree/master
Feel free to explore, modify, and use this project according to your needs. If you have any questions or suggestions, please don't hesitate to reach out.

Happy coding!

![Alt Text](./assets/todo.jpeg)
![Alt Text](./assets/swagger.jpeg)

