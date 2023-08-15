from fastapi import FastAPI
from models import Todo
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from fastapi import Query


import os
#
db_path = os.path.join(os.getcwd(), "test.db")
conn = sqlite3.connect(db_path)


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:8000/*",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/todos")
async def get_todos():
    con = sqlite3.connect("test.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT rowid, * FROM todos")
    rows = cur.fetchall()
    con.close()
    todos_list = [dict(row) for row in rows]
    return {"todos": todos_list}


@app.post("/todos")
async def create_todo(todo: Todo):
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute("INSERT INTO todos (item, isDone) VALUES (?, ?)", (todo.item, todo.isDone))
    con.commit()
    con.close()
    return {"message": "todo has been added:"}


# @app.put("/todos/{todo_id}")
# async def update_todo(todo_id: int, todo_obj: Todo):
#     con = sqlite3.connect("test.db")
#     cur = con.cursor()
#     cur.execute("UPDATE todos SET isDone = ? WHERE id = ?", (todo_obj.isDone, todo_id))
#     con.commit()  # Commit the delete operation
#     con.close()
#     return {"message": "no todo found to update"}


@app.patch("/todos/{todo_id}")
async def patch_todo(todo_id: int, is_done: bool = Query(...)):
    is_done_int = 1 if is_done else 0
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute("UPDATE todos SET isDone = ? WHERE id = ?", (is_done_int, todo_id))
    con.commit()
    con.close()
    return {"message": "todo updated successfully"}


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    con.commit()
    con.close()
    return {"message": "todo item has been removed"}




