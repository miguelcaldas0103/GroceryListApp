let groceryBudItems = [];

const form = document.querySelector('#grocery-form');
const groceryInput = document.querySelector('#grocery-item');
const groceryList = document.querySelector('#grocery-list');
const clearButton = document.querySelector('#clear-btn');

// Add event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const itemValue = groceryInput.value.trim();

    if (itemValue) {
        addItem(itemValue);
        updateUI();
        groceryInput.value = '';
    }
});

clearButton.addEventListener('click', () => {
    groceryBudItems = [];
    updateUI();
});

function addItem(item) {
    groceryBudItems.push(item);
}

// Function to update the list in the DOM
function updateUI() {
    groceryList.innerHTML = ''; // Clear existing list
    groceryBudItems.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
            ${item} 
            <button type="button" class="edit-btn" data-index="${index}">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        // Add event listeners for edit and delete buttons
        listItem.querySelector('.edit-btn').addEventListener('click', () => editItem(index));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteItem(index));

        groceryList.appendChild(listItem);
    });
}

// Function to edit an item
function editItem(index) {
    const newItem = prompt('Edit item:', groceryBudItems[index]);
    if (newItem !== null) {
        groceryBudItems[index] = newItem.trim() || groceryBudItems[index];
        updateUI();
    }
}

function deleteItem(index) {
    groceryBudItems.splice(index, 1);
    updateUI();
}