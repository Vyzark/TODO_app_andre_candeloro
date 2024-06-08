//TODO: Delete Event
//TODO: FILTER EVENTS
//TODO: add the property "pointer-events: none" to delete button span, svg and path
//TODO: Fix to-do's CSS
//TODO: Add the strike-through text-style for all text in the "Done" list + light grey text-color
//TODO: Replace the "+" button with an "ADD" styled to "merge" it together with the input field

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
    console.log(event.target.createBtn.value);
    const localForm = event.target;
    // Create a unique ID to use in each new object
    const uniqueId = createUniqueId([...todoList, ...doneList]);
    // Check if all inputs have a value
    if (event.target.addSelector.value === "") {
        alert("Please, don't leave empty fields");
        return;
    } else if (event.target.createBtn.value === "") {
        alert("Please, don't leave empty fields");
        return;
    }

    // Create new object with values from the inputs + generated ID
    const newItem = {
        id: uniqueId,
        task: localForm.createBtn.value,
        priority: localForm.addSelector.value,
    };

    console.log("todoList at event before", todoList);
    console.log("doneList at event before", doneList);

    // Check for duplicates to avoid creating the same todo more than once
    if (checkDuplicates(todoList, newItem)) {
        todoList.push(newItem);
        localStorage.setItem("whatToDos", JSON.stringify(todoList)); //* Local storage
        localStorage.setItem("whatIsDones", JSON.stringify(doneList)); //* Local storage

        console.log("todoList at event after", todoList);
        console.log("doneList at event after", doneList);

        printAllTodo(todoList, todoDiv);
    } else {
        alert("This to-do already exists in your list");
    }

    localForm.reset();
}

//* =========== FILTER EVENTS ===========
function priorityFilter(event) {}
function nameFilter(event) {}

//* =========== DELETE EVENT ===========
function deleteTodo(event) {
    console.log(event.target.parentNode.parentNode);
    const delButton = event.target;
    const divToDelete = event.target.parentNode.parentNode;
    const listId = divToDelete.id
    console.log("getId", event.target);
    // Remove object from DOM
    // divToDelete.remove()
    // console.log(divToDelete);
    // Remove object from lists
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

//* --------------------------PRINT FUNCTIONS----------------------------------------->>

function printOneTodo(todo, domObj) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");

    div.classList.add("check");
    div.id = todo.id;

    input.type = "checkbox";
    input.id = `item${todo.id}`;

    label.for = `item${todo.id}`;
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

    div.append(input, label, button);
    domObj.appendChild(div);

    //// console.log("inside the div", div.innerHTML); // --> LOG
}
function printAllTodo(list, domObj) {
    if (domObj.classList.value === "done") {
        domObj.innerHTML = `<h2>DONE</h2>`;
    } else {
        domObj.innerHTML = `<h2>TO DO</h2>`;
    }

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

//* -------------------------------------INIT------------------------------>>
function init() {
    // const priorityList = getPriorityList(); // CAN BE USED ONLY IF USING PRIORITY INPUT AS TYPE TEXT

    // Initialize the Select Options
    printAllOptions(priorityList, addSelectPriority);
    printAllOptions(priorityList, filterSelectPriority);

    // Initialize the To-Do's from local storage if not empty
    if (localStorage.getItem("whatToDos")) {
        let todoLocal = loadStored("todo");

        todoList.push(...todoLocal);
    }
    if (localStorage.getItem("whatIsDones")) {
        let doneLocal = loadStored("done");

        doneList.push(...doneLocal);
    }

    if (todoList.length !== 0) {
        printAllTodo(todoList, todoDiv);
    }
    if (doneList.length !== 0) {
        printAllTodo(doneList, doneDiv);
    }
}
init();
