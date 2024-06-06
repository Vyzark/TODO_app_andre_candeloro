//TODO: Replace the "+" button with an "ADD" styled to "merge" it together with the input field

//* --------------------------GLOBAL CONST DECLARATION----------------------------------------->>
const formTop = document.querySelector("#formTop");
const filterSelect = document.querySelector("#filterBottom select");
const filterInput = document.querySelector("#filterBottom input");
const todoDiv = document.querySelector(".todoContainer>.todo");
const doneDiv = document.querySelector(".todoContainer>.done");

let idCounter = 1; // Necessary? Use in addTodo

//* --------------------------LISTENERS----------------------------------------->>
formTop.addEventListener("submit", addTodo);
filterSelect.addEventListener("change", priorityFilter);
filterInput.addEventListener("input", nameFilter);

//* --------------------------EVENT FUNCTIONS----------------------------------------->>
function addTodo(event) {
    event.preventDefault();
    const localForm = event.target;

    printAllTodo(todoList, todoDiv);

    localForm.reset();
}
function priorityFilter(event) {}
function nameFilter(event) {}

//* --------------------------PRINT FUNCTIONS----------------------------------------->>

//* =========== PRINT TO-DO'S ===========
function printOneTodo(todo, domObj) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    console.log(todo);

    input.type = "checkbox";
    input.id = `item${todo.id}`;

    label.for = todo.id; // --> Check if value is correct
    label.classList.add(todo.priority);
    label.textContent = todo.task;
    label.innerHTML = `
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

    div.append(input, label);
    domObj.appendChild(div);
}
function printAllTodo(list, domObj) {
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
    list.forEach((option) => printOneOption(option, domObj));
}

//* --------------------------FILTER FUNCTIONS----------------------------------------->>

//* --------------------------AUXILIARY FUNCTIONS----------------------------------------->>
function capitalize(string) {
    return string.at(0).toUpperCase() + string.slice(1, string.length);
}
