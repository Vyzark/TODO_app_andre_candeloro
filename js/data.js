const taskList = [];
const priorityList = ["urgent", "daily", "monthly"];

function saveToLocal() {
    // Updates Local Storage
    localStorage.setItem("myTasks", JSON.stringify(taskList));
}
function loadLocal() {
    // Gets the saved list from Local Storage
    const localList = JSON.parse(localStorage.getItem("myTasks"));
    return localList;
}

//* --------------------------FILTER FUNCTIONS----------------------------------------->>
function filterByText(list, text) {
    const filteredList = list.filter(todo => {
        // Remove all accents and upper case letters
        const taskFix = removeAccentuation(todo.task).toLowerCase();
        const textFix = removeAccentuation(text).toLowerCase();

        return taskFix.includes(textFix);
    });
    return filteredList;
}

function filterByPriority(list, priority) {
    // prettier-ignore
    return list.filter(todo => todo.priority.toLowerCase() === priority.toLowerCase());
}

function filterTaskList(list, status) {
    const finished = list.filter(todo => todo.isFinished);
    const unfinished = list.filter(todo => !todo.isFinished);
    if (status === "finished") {
        return finished;
    } else {
        return unfinished;
    }
}

//* --------------------------AUXILIARY FUNCTIONS----------------------------------------->>

//* Capitalizes any word ------------------------------------>>
function capitalize(string) {
    return string.at(0).toUpperCase() + string.slice(1, string.length);
}

//* Removes all accents form any text ------------------------------------>>
function removeAccentuation(text) {
    let result = text.replaceAll("á", "a");
    result = text.replaceAll("é", "e");
    result = text.replaceAll("í", "i");
    result = text.replaceAll("ó", "o");
    result = text.replaceAll("ú", "u");
    result = text.replaceAll("Á", "A");
    result = text.replaceAll("É", "E");
    result = text.replaceAll("Í", "I");
    result = text.replaceAll("Ó", "O");
    result = text.replaceAll("Ú", "U");
    return result;
}

//* Check Duplicated Objects in a list ------------------------------------>>
function checkDuplicates(list, newObj) {
    let isDuped = list.some(
        todo =>
            todo.task.toLowerCase() === newObj.task.toLowerCase() &&
            todo.priority.toLowerCase() === newObj.priority.toLowerCase()
    );
    if (!isDuped) {
        // If it's not dupped in the list, return true
        return true;
    }
    return false;
}

//* Generate a unique ID ------------------------------------>>
function createUniqueId(listOfObjects) {
    // Check if list is empty to start from 0
    if (listOfObjects.length === 0) {
        return 0;
    }
    // Get all IDs from the taskList
    const existingIds = listOfObjects.map(obj => obj.id);
    // Get the highest ID value and increase it by 1
    const newId = Math.max(...existingIds) + 1;
    return newId;
}

//* Search for an element by it's ID and remove it from the list ------------------------------------>>
function searchAndDestroy(list, objectId) {
    // Make sure objectId is type number
    objectId = Number(objectId);

    let index = list.findIndex(todo => todo.id === objectId);
    if (index !== -1) {
        return list.splice(index, 1);
    } else {
        alert("Task not found.");
    }
}

//! UNFINISHED ------------------------------------>>
//* Function to get a list of priority values ------------------------------------>>
// Returns all possible values by default or can receive the todoList or doneList separately
//TODO: Add an input text priority button to make it functional
function getPriorityList(list = taskList) {
    const newList = [];
    list.forEach(todo => {
        newList.push(todo.priority);
    });
    return [...new Set(newList)];
}
