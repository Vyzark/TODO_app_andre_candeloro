const todoList = [
    {
        id: 1,
        task: "Buy groceries",
        priority: "daily",
    },
    {
        id: 2,
        task: "Pay rent",
        priority: "monthly",
    },
    {
        id: 3,
        task: "Schedule doctor's appointment",
        priority: "urgent",
    },
];

const doneList = [
    {
        id: 5,
        task: "Finish project report",
        priority: "urgent",
    },
];

// Separate TODO's into lists:
// Create a function that will move check marked items from one list to the other (use splice?)

// Create:
// 1. filterByPriority --> for the <select> filter
// 2. filterByName --> for <input> text

//* --------------------------AUXILIARY FUNCTIONS----------------------------------------->>
function capitalize(string) {
    return string.at(0).toUpperCase() + string.slice(1, string.length);
}

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

function filterByName(list, text) {
    return list.filter((todo) =>
        removeAccentuation(todo.task).includes(removeAccentuation(text))
    );
}

//TODO: Model - Check functionality
function filterByPriority(list, domElem) {
    return list.filter((todo) => todo.priority === domElem.value);
}

// Function to get a list of priority values. 
// Returns all possible values by default or can receive the todoList or doneList separately
//? Maybe add a custom priority button?
function getPriorityList(list = [...todoList, ...doneList]) {
    const newList = []
    list.forEach((todo) => {
        newList.push(todo.priority);
    })
    console.log(newList);
    return [...new Set(newList)]
}

//* Load to-do's from Local Storage ------------------------------------>>
function loadStored() {
    const localList = JSON.parse(localStorage.getItem("whatToDos"));
    return localList;
}

//* Check Duplicated Objects in a list ------------------------------------>>
function checkDuplicates(list, newObj) {
    let isDuped = list.some((todo) => todo.task === newObj.task && todo.priority === newObj.priority);
    if (!isDuped) {
        // If it's not dupped in the list, return true
        return true;
    }
    return false;
}