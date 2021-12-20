import { TodoList } from "./todo-list.js";

window.onload = () => {
    const todoList = new TodoList(document.getElementById("todo-list"));
    document.getElementById("btn-add").onclick = () => {
        const title = document.getElementById("title").value;
        const dueDate = new Date(document.getElementById("due-date").value);
        try {
            todoList.addTodo(title, dueDate);
        } catch (e) {
            alert(e.message);
        }
    }
}
