const isSameDate = (l, r) => {
  return l.getFullYear() === r.getFullYear()
    && l.getMonth() === r.getMonth()
    && l.getDate() === r.getDate()
}

const isBeforeDate = (l, r) => {
  return l.getFullYear() < r.getFullYear()
    || l.getFullYear() === r.getFullYear() && l.getMonth() < r.getMonth()
    || l.getFullYear() === r.getFullYear() && l.getMonth() === r.getMonth() && l.getDate() < r.getDate();
}

export class TodoList {
  renderTarget;
  todos;

  constructor(renderTarget) {
    this.renderTarget = renderTarget;
    this.todos = [];
  }

  addTodo(title, dueDate) {
    if (!title)
      throw new Error("You must enter a title");
    if (isNaN(dueDate?.getTime()))
      throw new Error("You must enter a due date");

    this.todos.push({ title, dueDate });
    this.todos.sort((l, r) => l.dueDate - r.dueDate)
    this.renderTodos();
  }

  removeTodo(todo) {
    this.todos = this.todos.filter(e => e !== todo);
    this.renderTodos();
  }

  renderTodos() {
    this.renderTarget.replaceChildren(...this.todos.map(todo => {
      const title = document.createElement("span");
      title.appendChild(document.createTextNode(todo.title));

      const dueDate = document.createElement("span");
      dueDate.appendChild(document.createTextNode(
        `due on: ${todo.dueDate.toLocaleDateString("en-US")}`));

      const btnRemove = document.createElement("button");
      btnRemove.appendChild(
        document.createTextNode("Remove TODO"));
      btnRemove.onclick = () => this.removeTodo(todo);

      const container = document.createElement("div");
      container.appendChild(title);
      container.appendChild(dueDate);
      container.appendChild(btnRemove);
      const now = new Date();
      if (isBeforeDate(todo.dueDate, now)) {
        container.classList.add("overdue");
      } else if (isSameDate(todo.dueDate, now)) {
        container.classList.add("due");
      }

      return container;
    }));
  }
}
