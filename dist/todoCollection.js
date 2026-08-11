"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
    username;
    todoItems;
    nextId = 1;
    itemMap = new Map();
    constructor(username, todoItems = []) {
        this.username = username;
        this.todoItems = todoItems;
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    // Add new task to list
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        // this.todoItems.push(new TodoItem(this.nextId, task));
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    }
    // Find item by id
    getTodoById(id) {
        // return this.todoItems.find((item) => item.id === id);
        return this.itemMap.get(id) ?? null;
    }
    // Mark item as complete or incomplete
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem)
            todoItem.complete = complete;
    }
    // Get list of items, optionally filtering out completed items
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }
}
exports.TodoCollection = TodoCollection;
//# sourceMappingURL=todoCollection.js.map