//TODO: Replace the "+" button with an "ADD" styled to "merge" it together with the input field
//TODO: FILTER EVENTS

//* --------------------------GLOBAL CONST DECLARATION----------------------------------------->>
const formTop = document.querySelector("#formTop");
const addSelectPriority = document.querySelector("#addSelector");
const filterSelectPriority = document.querySelector("#filterBottom select");
const filterInputTaskName = document.querySelector("#filterBottom input");
const todoDiv = document.querySelector(".todoContainer>.todo");
const doneDiv = document.querySelector(".todoContainer>.done");

let idCounter = 1;

//* --------------------------LISTENERS----------------------------------------->>
formTop.addEventListener("submit", addTodo);
filterSelectPriority.addEventListener("change", priorityFilter);
filterInputTaskName.addEventListener("input", nameFilter);

//* --------------------------EVENT FUNCTIONS----------------------------------------->>
//* =========== ADD EVENTS ===========
function addTodo(event) {
    event.preventDefault();
    const localForm = event.target;
    const newItem = {
        id: idCounter,
        task: localForm.createBtn.value,
        priority: localForm.addSelector.value,
    };
    console.log("todoList at event before", todoList);
    console.log("doneList at event before", doneList);

    if (checkDuplicates(todoList, newItem)) {
        todoList.push(newItem);
        idCounter++;
        localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
        localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage

        console.log("todoList at event after", todoList);
        console.log("doneList at event after", doneList);

        printAllTodo(todoList, todoDiv);
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
    const button = document.createElement("button");

    div.classList.add("check");

    input.type = "checkbox";
    input.id = `item${todo.id}`;

    label.for = `item${todo.id}`;
    label.classList.add(todo.priority);
    label.textContent = `${todo.task}`

    button.classList.add("noSelect");
    button.id = `button${todo.id}`;
    button.innerHTML = `
        <span class="text">Delete</span>
        <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24  24">
                <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                </path>
            </svg>
        </span>
    `;

    // Create onClick event for each delete button by ID
    button.addEventListener("click", deleteTodo);

    label.appendChild(button)
    div.append(input, label);
    domObj.appendChild(div);
}
function printAllTodo(list, domObj) {
    domObj.innerHTML = `<h2>TO DO</h2>`;
    list.forEach(todo => printOneTodo(todo, domObj));
}

//* =========== PRINT PRIORITY <OPTION> TAGS ===========
function printOneOption(item, domObj) {
    const option = document.createElement("option");

    option.textContent = capitalize(item);
    option.value = item;

    domObj.appendChild(option);
}
function printAllOptions(list, domObj) {
    domObj.innerHTML = `<option value="">Priority</option>`;
    list.forEach(option => printOneOption(option, domObj));
}

//* --------------------------DELETE FUNCTIONS----------------------------------------->>
function deleteTodo(event) {
    console.log(event.target);
    // console.log(event.target.parentNode.parentNode);

    // const deleteButton = event.target; // Retrieve <tr> element
    // const deleteById = Number(event.target.dataset.id); // Retrieve id value of the object to remove

    // // alert(`Subscription ID ${deleteById} deleted.`);

    // // Find and remove deleted element from list
    // let index = subscriptions.findIndex(sub => sub.id === deleteById);
    // if (index !== -1) {
    //     subscriptions.splice(index, 1);
    // }
    // // Removes HTML structure
    // deleteTr.remove();
}

//* -------------------------------------INIT------------------------------>>
function init() {
    //TODO: TEST INIT FUNCTION
    // const priorityList = getPriorityList(); //! CAN BE USED ONLY IF USING PRIORITY INPUT AS TYPE TEXT

    // Initialize the Select Options
    printAllOptions(priorityList, addSelectPriority);
    printAllOptions(priorityList, filterSelectPriority);

    // Initialize the To-Do's from local storage if not empty
    if (localStorage.getItem("whatToDos")) {
        let todoLocal = loadStored("todo");

        console.log("test local todo", [...todoLocal]);

        todoList.push(...todoLocal);
    }
    if (localStorage.getItem("whatIsDones")) {
        let doneLocal = loadStored("done");

        console.log("test local done", [...doneLocal]);

        doneList.push(...doneLocal);
    }

    console.log("todoList at init", todoList);
    console.log("doneList at init", doneList);

    printAllTodo(todoList, todoDiv);
    printAllTodo(doneList, doneDiv);
}
init();