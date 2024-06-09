//TODO: Add event for checkboxes, should move div's to and from todoList/doneList
//TODO: Change H2's to "WHAT TO-D0" and "WHAT IS DONE"
//TODO: Add the strike-through text-style for all text in the "Done" list + light grey text-color
//TODO: Adjust addForm text input height to match filter text input (40px) CSS
//TODO: Add outline or border to "ADD" button?
//TODO: Change the addForm priority selector bg color to match text input bg color
//TODO: Create a promise for an async while loop that prints a small red div with "don't leave empty fields"
//? while (input[type="text"].value === "" || addSelector.value === "")
//TODO: Don't forget MEDIA QUERIES CSS

//* --------------------------GLOBAL CONST DECLARATION----------------------------------------->>
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

//* --------------------------EVENT FUNCTIONS----------------------------------------->>
//* =========== ADD EVENTS ===========
function addTodo(event) {
    event.preventDefault();

    const topForm = event.target;
    // Create a unique ID to use in each new object
    const uniqueId = createUniqueId([...todoList, ...doneList]);
    // Check if all inputs have a value
    //prettier-ignore
    if (event.target.addSelector.value === "" && event.target.createBtn.value === "") {
        return;
    } else if (event.target.addSelector.value === "") {
        alert("Please, don't leave empty fields");
        return;
    } else if (event.target.createBtn.value === "") {
        alert("Please, don't leave empty fields");
        return;
    }

    // Create new object with values from the inputs + generated ID
    const newItem = {
        id: uniqueId,
        task: topForm.createBtn.value,
        priority: topForm.addSelector.value, //TODO: ===> ADD "FINISHED" PROPERTY WITH VALUE FALSE. ADD ALL OBJECT WITH FINISHED: TRUE TO DONE_LIST
    };

    // Check for duplicates to avoid creating the same todo more than once
    if (checkDuplicates(todoList, newItem)) {
        todoList.push(newItem);
        localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
        localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage

        printAllTodo(todoList, todoDiv);
    } else {
        alert("This to-do already exists in your list");
    }

    topForm.reset();
}

//* =========== FILTER EVENTS ===========
function priorityFilter(event) {
    if (event.target.value === "") {
        resetAllTodo();
        return;
    }
    // prettier-ignore
    const filteredList = filterByPriority([...todoList, ...doneList], event.target);
    printAllTodo(filteredList, todoDiv, event.target.value);
}

function nameFilter(event) {
    // prettier-ignore
    const filteredList = filterByText([...todoList, ...doneList], event.target.value);
    console.log(filteredList);
    printAllTodo(filteredList, todoDiv, event.target.value);
}

//* =========== DELETE EVENT ===========
function deleteTodo(event) {
    const divToDelete = event.target.parentElement; //* Using "parentNode" WON'T retrieve created ID for the element
    const objectId = Number(divToDelete.id);
    // Find and remove deleted element from list
    if (divToDelete.parentElement.classList.contains("todo")) {
        searchAndDestroy(todoList, objectId);
    } else {
        console.log("id", objectId);
        console.log(event.target.parentElement);
        console.log("removed -- ", searchAndDestroy(doneList, objectId));
    }
    // Remove object from DOM
    divToDelete.remove();
    // Update local storage
    localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
    localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage
}

//* =========== CHECKBOX CHECK EVENT ===========
function migrate(event) {
    const objectId = event.target.parentElement.id;
    console.log(event.target);

    if (event.target.checked) {
        console.log("Inside Check");
        // Splice object from todoList
        const migratoryObj = searchAndDestroy(todoList, objectId);
        // Push object to doneList
        doneList.push(...migratoryObj);
        // event.target.checked = true
        event.target.setAttribute("checked", true);
    } else {
        console.log("Inside Uncheck");
        // Splice object from doneList
        console.log("before, done -- ", doneList);
        console.log("id", objectId);

        const migratoryObj = searchAndDestroy(doneList, objectId);

        console.log("after, done -- ", doneList);

        // Push object to todoList

        console.log("before, todo -- ", todoList);

        todoList.push(migratoryObj);

        console.log("after, todo -- ", todoList);
        // event.target.checked = false
        event.target.removeAttribute("checked", false);
    }
    console.log(event.target);
    // Reset the DOM
    resetAllTodo();

    // Update local storage
    localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
    localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage
}

//* --------------------------PRINT FUNCTIONS----------------------------------------->>

function printOneTodo(todo, domObj) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");

    div.classList.add("check");
    div.id = todo.id; // Differentiates each button to avoid mass delete and can be used to get object's ID

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
    input.addEventListener("change", migrate);

    div.append(input, label, button);
    domObj.appendChild(div);
}
function printAllTodo(list, domObj, filter = false) {
    if (domObj.classList.value === "done" && !filter) {
        domObj.innerHTML = `<h2>DONE</h2>`;
    } else if (domObj.classList.value === "todo" && !filter) {
        domObj.innerHTML = `<h2>TO DO</h2>`;
    }

    if (filter === "") {
        domObj.innerHTML = `<h2>TO DO</h2><h2>DONE</h2>`;
        resetAllTodo();
        return;
    }

    // Checks if activating function from a filter event to erase all HTML
    // Shows all filtered to-do's, regardless of completion status, in the same list
    if (filter) {
        domObj.nextElementSibling.innerHTML = "";
        domObj.innerHTML = `<h2>YOUR ${filter.toUpperCase()} TO-DO's</h2>`;
    }
    list.forEach(todo => printOneTodo(todo, domObj));
}

// Resets both to-do lists to print all existing to-do's state
function resetAllTodo() {
    printAllTodo(todoList, todoDiv);
    printAllTodo(doneList, doneDiv);
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

//* -------------------------------------INIT------------------------------>>
function init() {
    // const priorityList = getPriorityList(); // CAN BE USED ONLY IF USING PRIORITY INPUT AS TYPE TEXT

    // Initialize the Select Options
    printAllOptions(priorityList, addSelectPriority);
    printAllOptions(priorityList, filterSelectPriority);

    // Initialize the To-Do's from local storage if not empty
    initGetLocal();

    // Check if lists are empty before calling print functions
    if (todoList.length !== 0) {
        printAllTodo(todoList, todoDiv);
    }
    if (doneList.length !== 0) {
        printAllTodo(doneList, doneDiv);
    }
}
init();
