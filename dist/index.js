"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const prompts_1 = require("@inquirer/prompts");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"),
    new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"),
    new todoItem_1.TodoItem(4, "Call Joe", true),
];
let collection = new todoCollection_1.TodoCollection("Moi", todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.username}'s Todo List (${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    // Show = "Show All Tasks",
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
async function promptAdd() {
    console.clear();
    const answer = await (0, prompts_1.input)({
        message: "Enter task:",
        validate: (input) => input.trim() !== "" || "Task cannot be empty"
    });
    collection.addTodo(answer);
    promptUser();
}
async function promptComplete() {
    console.clear();
    const answer = await (0, prompts_1.checkbox)({
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map(item => {
            return {
                name: item.task,
                value: item.id,
                // disabled: item.complete
            };
        }),
    });
    // let completedItems = collection.getTodoItems(true).filter(item => answer.includes(item.id));
    // collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedItems.includes(item)));
    let completedItems = collection.getTodoItems(true).filter(item => answer.includes(item.id)).map(item => item.id);
    collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedItems.find(id => id === item.id) !== undefined));
    promptUser();
}
// Prompt user for command
async function promptUser() {
    console.clear();
    displayTodoList();
    const answer = await (0, prompts_1.rawlist)({
        message: 'Choose option (use arrow keys)',
        // choices: [
        //   { name: 'npm', value: 'npm' },
        //   { name: 'yarn', value: 'yarn' },
        //   { name: 'pnpm', value: 'pnpm' },
        // ],
        choices: Object.values(Commands),
    });
    switch (answer) {
        case Commands.Add:
            await promptAdd();
            break;
        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands.Complete:
            if (collection.getItemCounts().incomplete > 0) {
                await promptComplete();
            }
            else {
                console.log("No incomplete tasks to mark as complete.");
                promptUser();
            }
            break;
        case Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
        case Commands.Quit:
            console.log("Goodbye!");
            break;
    }
}
promptUser();
//# sourceMappingURL=index.js.map