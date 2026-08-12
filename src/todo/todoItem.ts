
export class TodoItem {
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

    constructor(public id: number, public task: string, public complete: boolean = false){
        // no statements needed
    }

    // Method(s)
    public printDetails() : void {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)": ""}`);
    }
}