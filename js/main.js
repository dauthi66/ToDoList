var toDoKey = "toDoKey";
window.onload = function () {
    var picker = datepicker('#due_date');
    picker.setMin(new Date());
    var addItem = $("add_item");
    addItem.onclick = process;
    loadToDoItem();
};
function process() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDoItem(item);
    }
}
var ToDoItem = (function () {
    function ToDoItem(itemName, dueDate, isComplete) {
        this.itemName = itemName;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
    return ToDoItem;
}());
function isValid() {
    return true;
}
function getToDoItem() {
    var itemName = $HTMLinput("item_name").value;
    var dueDate = new Date($HTMLinput("due_date").value);
    var isComplete = $HTMLinput("is_complete").checked;
    var newItem = new ToDoItem(itemName, dueDate, isComplete);
    return newItem;
}
function displayToDoItem(item) {
    var itemName = document.createElement("h3");
    itemName.innerText = item.itemName;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("toDo");
    if (item.isComplete) {
        itemDiv.classList.add("complete");
    }
    else {
        itemDiv.classList.add("incomplete");
    }
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemDate);
    if (item.isComplete) {
        $("complete_items").appendChild(itemDiv);
    }
    else {
        $("incomplete_items").appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    if (itemDiv.className == "toDo incomplete") {
        itemDiv.classList.add("complete");
        itemDiv.classList.remove("incomplete");
        playMarkSound();
        $("complete_items").appendChild(itemDiv);
    }
    else {
        itemDiv.classList.add("incomplete");
        itemDiv.classList.remove("complete");
        playEraseSound();
        $("incomplete_items").appendChild(itemDiv);
    }
}
function saveToDoItem(item) {
    var itemString = JSON.stringify(item);
    localStorage.setItem(toDoKey, itemString);
}
function loadToDoItem() {
    var item = JSON.parse(localStorage.getItem(toDoKey));
    displayToDoItem(item);
}
function playMarkSound() {
    var markSound = document.getElementById("pencil_mark");
    markSound.play();
}
function playEraseSound() {
    var eraseSound = document.getElementById("erase");
    eraseSound.play();
}
function $HTMLinput(id) {
    return document.getElementById(id);
}
function $(id) {
    return document.getElementById(id);
}
