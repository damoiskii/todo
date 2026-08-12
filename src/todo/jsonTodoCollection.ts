import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { JSONFilePreset } from 'lowdb/node'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

type Schema = {
    todos: TodoItem[];
};

export class JsonTodoCollection extends TodoCollection {
    private database: Low<Schema>;

    constructor(username: string, todoItems: TodoItem[] = []) {
        super(username, todoItems);
        
        this.database = new Low<Schema>(new JSONFile<Schema>('todos.json'), { todos: [] });

        if(this.database.data.todos.length > 0){
            const dbItems = this.database.data.todos;
            dbItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
        }
        else {
            this.database.data.todos = [...todoItems];
            this.database.write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        }
    }

    private storeTasks() {
        // this.database.set("tasks", [...this.itemMap.values()]).write();
        this.database.data.todos = [...this.itemMap.values()];
        this.database.write();
    }

    addTodo(task: string): number {
        const id = super.addTodo(task);
        this.storeTasks();
        return id;
    }

    markComplete(id: number, complete: boolean) {
        super.markComplete(id, complete);
        this.storeTasks();
    }

    removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    }
}