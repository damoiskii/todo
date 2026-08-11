import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import { rawlist, input, checkbox, select, Separator } from '@inquirer/prompts';

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Moi", todos);
let showCompleted: boolean = true;

function displayTodoList(): void{
    console.log(`${collection.username}'s Todo List (${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands{
    Add = "Add New Task",
    Complete = "Complete Task",
    // Show = "Show All Tasks",
    Purge = "Remove Completed Tasks",
    Toggle = "Show/Hide Completed",
    Quit = "Quit"
}

async function promptAdd(): Promise<void>{
    console.clear();
    const answer = await input({
        message: "Enter task:",
        validate: (input) => input.trim() !== "" || "Task cannot be empty"
    });

    collection.addTodo(answer);
    promptUser();
}

async function promptComplete(): Promise<void>{
    console.clear();
    const answer = await checkbox({
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

    let completedItems = collection.getTodoItems(true).filter(item => answer.includes(item.id)).map(item => item.id) as number[];
    collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedItems.find(id => id === item.id) !== undefined));

    promptUser();
}


// Prompt user for command
async function promptUser(): Promise<void>{
    console.clear();
    displayTodoList();

    const answer = await rawlist({
        message: 'Choose option (use arrow keys)',
        // choices: [
        //   { name: 'npm', value: 'npm' },
        //   { name: 'yarn', value: 'yarn' },
        //   { name: 'pnpm', value: 'pnpm' },
        // ],
        choices: Object.values(Commands),
    });

    switch(answer){
        case Commands.Add:
            await promptAdd();
            break;

        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;

        case Commands.Complete:
            if(collection.getItemCounts().incomplete > 0){
                await promptComplete();
            } else {
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
