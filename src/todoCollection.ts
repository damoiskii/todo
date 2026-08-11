import { TodoItem } from './todoItem';

export class TodoCollection{
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(public username: string, public todoItems: TodoItem[] = []){
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    // Add new task to list
    addTodo(task: string): number{
        while(this.getTodoById(this.nextId)){
            this.nextId++;
        }

        // this.todoItems.push(new TodoItem(this.nextId, task));
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }

    // Find item by id
    getTodoById(id: number): TodoItem|null{
        // return this.todoItems.find((item) => item.id === id);
        return this.itemMap.get(id) ?? null;
    }

    // Mark item as complete or incomplete
    markComplete(id: number, complete: boolean){
        const todoItem = this.getTodoById(id);

        if(todoItem) todoItem.complete = complete;
    }

    // Get list of items, optionally filtering out completed items
    getTodoItems(includeComplete: boolean): TodoItem[]{
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }

    // Remove all completed items from the list
    removeComplete(): void{
        this.itemMap.forEach(item => {
            if(item.complete) this.itemMap.delete(item.id);
        });
    }
}