import { TodoItem } from './todoItem';
type ItemCounts = {
    total: number;
    incomplete: number;
};
export declare class TodoCollection {
    username: string;
    todoItems: TodoItem[];
    private nextId;
    private itemMap;
    constructor(username: string, todoItems?: TodoItem[]);
    addTodo(task: string): number;
    getTodoById(id: number): TodoItem | null;
    markComplete(id: number, complete: boolean): void;
    getTodoItems(includeComplete: boolean): TodoItem[];
    removeComplete(): void;
    getItemCounts(): ItemCounts;
}
export {};
//# sourceMappingURL=todoCollection.d.ts.map