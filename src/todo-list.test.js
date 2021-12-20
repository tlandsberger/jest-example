import { TestWatcher } from '@jest/core';
import { jest } from '@jest/globals';
import { TodoList } from "./todo-list.js";

const expectOrderedDates = (todos) => {
  const timestamps = todos.map(e => e.dueDate.getTime());
  for (let i = 0; i < timestamps.length - 1; i++) {
    expect(timestamps[i]).toBeLessThanOrEqual(timestamps[i + 1]);
  }
}

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList(document.body);
    todoList.addTodo("send seminar paper to peer reviewers",
      new Date("2021-10-18"));
    todoList.addTodo("upload seminar paper to Moodle",
      new Date("2021-11-15"));
    todoList.addTodo("send presentation to peer reviewers",
      new Date("2021-12-06"));
    todoList.addTodo("upload presentation to Moodle",
      new Date("2021-12-22"));
  });

  it("should be created", () => {
    expect(todoList).toBeDefined();
  });

  describe("addTodo()", () => {
    beforeEach(() => {
      jest.spyOn(todoList, "renderTodos").mockReset();
    });

    it("should insert the added todo to the todo list", () => {
      const oldLength = todoList.todos.length;
      todoList.addTodo("do the shopping", new Date("2021-10-01"));
      expect(todoList.todos.length).toBeGreaterThan(oldLength);
      expect(todoList.todos).toContainEqual({
        title: "do the shopping",
        dueDate: new Date("2021-10-01")
      });
    });

    it("should sort the todos ascendening by due date", () => {
      todoList.addTodo("do the shopping", new Date("2021-10-01"));
      expectOrderedDates(todoList.todos);
    });

    it("should call renderTodos()", () => {
      todoList.addTodo("do the shopping", new Date("2021-10-01"));
      expect(todoList.renderTodos).toHaveBeenCalled();
    });

    it("should throw if no title is given", () => {
      expect(() => todoList.addTodo(undefined, new Date())).toThrow();
      expect(() => todoList.addTodo(null, new Date())).toThrow();
      expect(() => todoList.addTodo("", new Date())).toThrow();
    });

    it("should throw if an invalid date is given", () => {
      expect(() => todoList.addTodo("foo", undefined)).toThrow();
      expect(() => todoList.addTodo("foo", null)).toThrow();
      expect(() => todoList.addTodo("foo", new Date("invalid"))).toThrow();
    });
  });

  describe("removeTodo()", () => {
    beforeEach(() => {
      jest.spyOn(todoList, "renderTodos").mockReset();
    });

    it("should remove the given todo from the todo list", () => {
      const oldLength = todoList.todos.length;
      todoList.removeTodo(todoList.todos[0]);
      expect(todoList.todos.length).toBeLessThan(oldLength);
      expect(todoList.todos).not.toContainEqual({
        title: "send seminar paper to peer reviewers",
        dueDate: new Date("2021-10-18")
      });
    });

    it("should sort the todos ascendening by due date", () => {
      todoList.removeTodo(todoList.todos[0]);
      expectOrderedDates(todoList.todos);
    });

    it("should call renderTodos()", () => {
      todoList.removeTodo(todoList.todos[0]);
      expect(todoList.renderTodos).toHaveBeenCalled();
    });
  });

  describe("renderTodos()", () => {
    it("should render the todos (snapshot test)", () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2021-11-15"));
      todoList.renderTodos();
      expect(document.body).toMatchSnapshot();
    });
  });
});
