const formTop = document.querySelector("#formTop");
const addSelectPriority = document.querySelector("#addSelector");
const filterSelectPriority = document.querySelector("#filterBottom select");
const filterInputTaskName = document.querySelector("#filterBottom input");
const todoDiv = document.querySelector(".todoContainer>.todo");
const doneDiv = document.querySelector(".todoContainer>.done");

//* --------------------------LISTENERS----------------------------------------->>
formTop.addEventListener("submit", addTodo);
filterSelectPriority.addEventListener("change", priorityFilter);
filterInputTaskName.addEventListener("input", nameFilter);

//* --------------------------------INIT----------------------------------->>

function init() {
    // Initialize the Select Options
    printAllOptions(priorityList, addSelectPriority);
    printAllOptions(priorityList, filterSelectPriority);

    // Initialize the To-Do's from local storage if not empty
    const localList = loadLocal();
    if (localList !== null && localList.length !== 0) {
        taskList.push(...localList);
        printAllTodo(taskList);
    }
}
init();

//* --------------------------EVENT FUNCTIONS----------------------------------------->>
//* =========== ADD EVENT ===========
function addTodo(event) {
    event.preventDefault();
    const topForm = event.target;
    const selectValue = topForm.addSelector.value;
    const textInputValue = topForm.createBtn.value;

    // Create a unique ID to use in each new object
    const uniqueId = createUniqueId(taskList);
    // Check if all inputs are valid (not empty)
    const isValidInput = checkInputStatus(selectValue, textInputValue);
    if (!isValidInput) {
        return;
    }

    // Create new object with values from the inputs + generated ID
    const newItem = {
        id: uniqueId,
        task: textInputValue,
        priority: selectValue,
        isFinished: false, // Objects are created with "finished: false" and modified to true when checked
    };

    // Check for duplicates to avoid creating the same todo more than once
    if (checkDuplicates(taskList, newItem)) {
        taskList.push(newItem);
        saveToLocal(); //* Updates local storage
        printAllTodo(taskList); // Prints the new task to the To-Do section
    } else {
        alert("This to-do already exists in your list");
    }

    topForm.reset();
}

//* =========== FILTER EVENTS ===========
function priorityFilter(event) {
    const priority = event.target.value;
    if (priority === "") {
        printAllTodo(taskList);
        return;
    }
    const filteredList = filterByPriority(taskList, priority);
    printAllTodo(filteredList, priority);
}

function nameFilter(event) {
    const inputText = event.target.value;
    const filteredList = filterByText(taskList, inputText);
    printAllTodo(filteredList, inputText);
}

//* =========== DELETE EVENT ===========
function deleteTodo(event) {
    //* Node Objects won't have all of the element's attributes
    //* Using "parentNode" WON'T retrieve created ID for the element
    const divToDelete = event.target.parentElement;
    const objectId = divToDelete.id;

    // Find and remove deleted element from list
    searchAndDestroy(taskList, objectId);

    // Remove object from DOM
    divToDelete.remove();
    // Update local storage
    saveToLocal();
}

//* --------------------------PRINT FUNCTIONS----------------------------------------->>
//* =========== PRINT TASKS ===========
function printOneTodo(todo, domObj) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    
    div.classList.add("check");
    div.id = todo.id; // Differentiates each div to avoid mass delete and can be used to get object's ID

    input.type = "checkbox";
    input.id = `item${todo.id}`;

    label.setAttribute("for", `item${todo.id}`);
    label.classList.add(todo.priority);
    label.textContent = `${todo.task}`;

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
    // Create onChange event for each Checkbox
    input.addEventListener("click", event => {
        taskComplete = todo.isFinished;
        if (taskComplete) {
            todo.isFinished = false;
            event.target.classList.remove("showCheckmark");
        } else {
            todo.isFinished = true;
            event.target.classList.add("showCheckmark");
        }
        saveToLocal();
        printAllTodo(taskList);  //! BUG: PRINT ALL RESETS THE CHANGES TO THE ATTRIBUTES OF THE INPUT
    });
    
    div.append(input, label, button);
    domObj.appendChild(div);

}
function printAllTodo(list, textFilter = false) {
    // Reset DOM
    todoDiv.innerHTML = `<h2>WHAT TO-DO's</h2>`;
    doneDiv.innerHTML = `<h2>WHAT IS DONE</h2>`;

    // Checks if activating function from a filter event to replace HTML section titles
    // Shows all filtered to-do's, regardless of completion status, in the same list
    if (textFilter && textFilter !== "") {
        todoDiv.nextElementSibling.innerHTML = "";
        todoDiv.innerHTML = `<h2>YOUR ${textFilter.toUpperCase()} TO-DO's</h2>`;
    }

    updateLists(list);
}

function updateLists(list) {
    // Filter tasks by completion
    const finishedTasks = filterTaskList(list, "finished");
    const unfinishedTasks = filterTaskList(list, "unfinished");
    // Print all tasks
    unfinishedTasks.forEach(todo => printOneTodo(todo, todoDiv));
    finishedTasks.forEach(todo => printOneTodo(todo, doneDiv));
    // Updates Local Storage
    saveToLocal();
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

//* --------------------------AUXILIARY FUNCTIONS----------------------------------------->>

function checkInputStatus(selectorInput, textInput) {
    //prettier-ignore
    if (selectorInput === "" && textInput === "") {
        return false;
    } else if (selectorInput === "") {
        alert("Please, don't leave empty fields");
        return false;
    } else if (textInput === "") {
        alert("Please, don't leave empty fields");
        return false;
    } else {
        return true
    }
}
