"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
class TodoItem {
    id;
    task;
    complete;
    // Properties
    // public id: number;
    // public task: string;
    // public complete: boolean = false;
    // Constructor(s)
    // Other programming languages
    // public constructor(id: number, task: string, complete: boolean = false){
    //     this.id = id;
    //     this.task = task;
    //     this.complete = complete;
    // }
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // no statements needed
    }
    // Method(s)
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
exports.TodoItem = TodoItem;
//# sourceMappingURL=todoItem.js.map