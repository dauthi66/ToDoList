window.onload = function () {
    var picker = datepicker('#due_date');
    picker.setMin(new Date());
    var addItem = $("add_item");
    addItem.onclick = process;
};
function process() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
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
    var dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isComplete) {
        itemDiv.classList.add("complete");
    }
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(dueDate);
    if (item.isComplete) {
        var completeToDo = $("complete_items").appendChild(itemDiv);
    }
    else {
        var completeToDo = $("incomplete_items").appendChild(itemDiv);
    }
}
function $HTMLinput(id) {
    return document.getElementById(id);
}
function $(id) {
    return document.getElementById(id);
}
