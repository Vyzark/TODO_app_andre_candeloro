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
    {
        id: 4,
        task: "Clean the house",
        priority: "daily",
    },
    {
        id: 6,
        task: "Water the plants",
        priority: "daily",
    },
    {
        id: 7,
        task: "Renew car insurance",
        priority: "monthly",
    },
    {
        id: 8,
        task: "Prepare presentation for meeting",
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

//* HTML DELETE Button Model
// Add span elements with dom.innerHTML
{
    /* <button class="noSelect">
<span class="text">Delete</span>
<span class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24  24">
        <path
            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
        </path>
    </svg>
</span>
</button> */
}

// Separate TODO's into lists:
// Create a function that will move check marked items from one list to the other (use splice?)

// Create:
// 1. filterByPriority --> for the <select> filter
// 2. filterByName --> for <input> text

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

function filterByPriority(list, domElem) {
    return list.filter(todo => todo.priority === domElem.value);
}