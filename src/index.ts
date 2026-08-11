import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';


let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Moi", todos);



let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem|null = collection.getTodoById(newId);

console.clear();
console.log(`${collection.username}'s Todo List (${collection.getItemCounts().incomplete} items to do)`);

// console.log(JSON.stringify(todoItem));
// console.log(`Item #${todoItem?.id} is "${todoItem?.task}".`);
// todoItem?.printDetails();

// collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails());