window.onload = function(){

    //creates date picker function on due date
    //@ts-ignore: (ignore error) Datepicker does not have intellisense
    const picker = datepicker('#due_date');
    picker.setMin(new Date()); //sets min to today.

    let addItem = $("add_item");
    addItem.onclick = process;
}

function process(){
    if (isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

class ToDoItem{
    itemName:string;
    dueDate: Date;
    isComplete:boolean;

    constructor(itemName:string, dueDate:Date, isComplete:boolean){
        this.itemName = itemName;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    return true;
}

/**
 * get input from form and set int toDoItem
 */
function getToDoItem():ToDoItem{

    //set item's title to value given on title input
    let itemName = $HTMLinput("item_name").value;
    //set item's due date to a new Date using input selected by user
    let dueDate = new Date($HTMLinput("due_date").value);
    //set items complete toggle to true if checked
    let isComplete = $HTMLinput("is_complete").checked;

    let newItem = new ToDoItem(itemName, dueDate, isComplete);
    
    return newItem;
}

/**
 * Displays ToDoItem on To Do List
 */
function displayToDoItem(item:ToDoItem):void{
    
}

//refactor cast and get by id.
function $HTMLinput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

//refactor cast and get by id.
function $(id):HTMLElement {
    return document.getElementById(id);
}
//let item = new ToDoItem("Testing", new Date(2021, 12, 11), false);

//Task: Allow user to mark a ToDoItem as completed
//Task: Store ToDOItems in web storage.