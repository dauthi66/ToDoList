const toDoArrayKey = "toDoKey";

window.onload = function(){

    //creates date picker function on due date
    //@ts-ignore: (ignore error) Datepicker does not have intellisense
    const picker = datepicker('#due_date');
    picker.setMin(new Date()); //sets min to today.
    //set up add_item button
    let addItem = $("add_item");
    addItem.onclick = process;
    //set up clear_items button
    let resetItems = $("clear_items");
    resetItems.onclick = clearItems;
    loadSavedItems();
}

function process(){
    if (isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        //let savedItems = new Array;
        saveToDoItem(item);
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
    let itemDate = document.createElement("p");
    //dueDate.innerText = item.dueDate.toDateString(); GLITCH IN CONVERTING TO JSON
    let dueDate = new Date (item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    //create item div to populate with user data
    let itemDiv = document.createElement("div");
    //setup onclick event
    itemDiv.onclick = markAsComplete;

    //give all itemDivs class todo for styling
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
    itemDiv.appendChild(itemDate);
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
    //this targets element clicked on, and casting is needed.
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

/**
 * takes user's inputs and stores it in their local storage as an array for later visits
 * @param item a ToDoItem object
 */
function saveToDoItem(item:ToDoItem):void{
    let currItems = getToDoItems();
    //if array doesn't exist
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    //turn array back to string
    let currItemsString = JSON.stringify(currItems);
    //resave back into local storage
    localStorage.setItem(toDoArrayKey, currItemsString);
}

/**
 * retrieves the string from users local storage and converts to ToDoKey
 * stores in an array of ToDoItems
 * @returns a ToDoItem Array
 */
function getToDoItems():ToDoItem[]{ //getToDoItems
    //retrieve string from local storage from const key array and change item to ToDoItem
    let itemString = localStorage.getItem(toDoArrayKey); 
    let itemArray:ToDoItem[] = JSON.parse(itemString);

    return itemArray;
}
/**
 * Retrieve items from storage array and load to page
 */
function loadSavedItems(){
    let itemArray = getToDoItems();
    for (let item = 0; item < itemArray.length; item++) {
        displayToDoItem(itemArray[item]);
    }
}
/**
 * clears user's localStorage (ToDoItems)
 */
function clearItems(){
    localStorage.clear();
    location.reload();
}

function playMarkSound():void{
    let markSound = <HTMLAudioElement>document.getElementById("pencil_mark");
        markSound.play();
}

function playEraseSound():void{
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

//Task: Store ToDOItems in web storage.