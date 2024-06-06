//TODO: Replace the "+" button with an "ADD" styled to "merge" it together with the input field
//TODO: FILTER EVENTS

//* --------------------------GLOBAL CONST DECLARATION----------------------------------------->>
const formTop = document.querySelector("#formTop");
const addSelectPriority = document.querySelector("#addSelector");
const filterSelectPriority = document.querySelector("#filterBottom select");
const filterInputTaskName = document.querySelector("#filterBottom input");
const todoDiv = document.querySelector(".todoContainer>.todo");
const doneDiv = document.querySelector(".todoContainer>.done");

let idCounter = 1; // Necessary? Use in addTodo

//* --------------------------LISTENERS----------------------------------------->>
formTop.addEventListener("submit", addTodo);
filterSelectPriority.addEventListener("change", priorityFilter);
filterInputTaskName.addEventListener("input", nameFilter);

//* --------------------------EVENT FUNCTIONS----------------------------------------->>
//* =========== ADD EVENTS ===========
function addTodo(event) {
    event.preventDefault();
    const localForm = event.target;
    console.log(localForm.addSelector.value); //TODO: TEST THIS VALUE
    const newItem = {
        id: idCounter,
        task: localForm.createBtn.value,
        priority: localForm.addSelector.value,
    }
    if (checkDuplicates(todoList, newItem)) {
        todoList.push(newItem);
        idCounter++
        localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
        localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage

        printAllTodo(todoList, todoDiv);
        printAllTodo(doneList, doneDiv);
    }

    localForm.reset();
}

//* =========== FILTER EVENTS ===========
function priorityFilter(event) {}
function nameFilter(event) {}

//* --------------------------PRINT FUNCTIONS----------------------------------------->>

function printOneTodo(todo, domObj) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    div.classList.add("check");

    input.type = "checkbox";
    input.id = `item${todo.id}`;

    label.for = `item${todo.id}`; // --> Check if value is correct
    label.classList.add(todo.priority);
    label.innerHTML = `${todo.task}
    <button class="noSelect">
        <span class="text">Delete</span>
        <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24  24">
                <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                </path>
            </svg>
        </span>
    </button>
    `;

    // console.log(label.innerHTML);
    // console.log(label.textContent);

    div.append(input, label);
    domObj.appendChild(div);
}
function printAllTodo(list, domObj) {
    domObj.innerHTML = "";
    list.forEach((item) => printOneTodo(item, domObj));
}

//* =========== PRINT PRIORITY <OPTION> TAGS ===========
function printOneOption(item, domObj) {
    const option = document.createElement("option");

    option.textContent = capitalize(item.priority);
    option.value = item.priority;

    domObj.appendChild(option);
}
function printAllOptions(list, domObj) {
    domObj.innerHTML = ""; //TODO: Check functionality
    list.forEach((option) => printOneOption(option, domObj));
}

//* -------------------------------------INIT------------------------------>>
function init() { //TODO: TEST INIT FUNCTION
    const priorityList = getPriorityList();
    // Initialize the Select Options
    printAllOptions(priorityList, addSelectPriority);
    printAllOptions(priorityList, filterSelectPriority);
    // Initialize the To-Do's from local storage
    if (localStorage.getItem("whatToDos")) {
        favoriteList.push(todoList);
    }
    if (localStorage.getItem("whatIsDones")) {
        favoriteList.push(doneList);
    }

    printAllTodo(todoList, todoDiv);
    printAllTodo(doneList, todoDiv);
}
