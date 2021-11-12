window.onload = function(){

    //creates date picker function on due date
    //@ts-ignore: (ignore error) Datepicker does not have intellisense
    const picker = datepicker('#due_date');
    picker.setMin(new Date()); //sets min to today.

    let addItem = $("add_item");
    addItem.onclick = process;

    let 
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
 * get input from form and set in toDoItem object
 */
function getToDoItem():ToDoItem{

    //set item's title to value given on title input
    let itemName = $HTMLinput("item_name").value;
    //set item's due date to a new Date using input selected by user
    let dueDate = new Date($HTMLinput("due_date").value);
    //set items complete toggle to true if checked
    let isComplete = $HTMLinput("is_complete").checked;

    let newItem = new ToDoItem(itemName, dueDate, isComplete);

    //convert the object to JSON string
    let itemString = JSON.stringify(newItem);
    //store it in user's local storage
    localStorage.setItem("ToDoItem", itemString)
    
    return newItem;
}

/**
 * Displays ToDoItem on To Do List
 */
function displayToDoItem(item:ToDoItem):void{
    //create h3 with users item name
    let itemName = document.createElement("h3");
    itemName.innerText = item.itemName;
    // create p with user's due date
    let dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate.toDateString();

    //create item div to populate with user data
    let itemDiv = document.createElement("div");
    //setup onclick event
    itemDiv.onclick = markAsComplete;

    //give all itemDivs class todo for syling
    itemDiv.classList.add("toDo");
    //class it as complete or incomplete for styling
    if (item.isComplete) {
        itemDiv.classList.add("complete");
    }
    else{
        itemDiv.classList.add("incomplete");
    }

    //place itemName and DueDate within created itemDiv
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(dueDate);

    //place populated itemDiv in complete or incomplete div
    if(item.isComplete){
        $("complete_items").appendChild(itemDiv); 
    }
    else{
        $("incomplete_items").appendChild(itemDiv); 
    }
}

/**
 * if incomplete adds complete to the element's class, and vice versa
 * play a corresponding sound
 */
function markAsComplete(){
    //this targets element, and casting is needed.
    let itemDiv = <HTMLDivElement>this;
    
    //if class is incomplete (first classname toDo must be included)
    if (itemDiv.className == "toDo incomplete") {
        //make it complete
        itemDiv.classList.add("complete");
        itemDiv.classList.remove("incomplete")
        playMarkSound();

        //append itemDiv onto complete_items div
        $("complete_items").appendChild(itemDiv);      
    //otherwise make it incomplete
    } else {
        itemDiv.classList.add("incomplete");
        itemDiv.classList.remove("complete")
        playEraseSound();

        //append itemDiv onto complete_items div
        $("incomplete_items").appendChild(itemDiv);      
    }
}

function playMarkSound(){
    let markSound = <HTMLAudioElement>document.getElementById("pencil_mark");
        markSound.play();
}

function playEraseSound(){
    let eraseSound = <HTMLAudioElement>document.getElementById("erase");
        eraseSound.play();
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