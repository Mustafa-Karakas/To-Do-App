const form = document.getElementById("todo-form");
const todoList = document.getElementById("list");
const todoInput = document.getElementById("todo");
const addBtn = document.getElementById("add");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-todos");
const deleteAllButton = document.getElementById("clear-todos");

let list = [];

function removeItem(el) {
    const value = el.parentNode.firstChild.innerText;
    const index = list.findIndex(item => item === value);
    list.splice(index, 1);

    localStorage.setItem("list", JSON.stringify(list));
    el.parentNode.remove();
}


function addItem(value) {
    if (!value) {
        alert(" ‼ Add your a todo please ‼");
        return;
    }

    appendItem(value);

    todoInput.value = "";
    list.push(value);
    localStorage.setItem("list", JSON.stringify(list));
}

function appendItem(value) {
    const item = `
        <li class="list-group-item d-flex justify-content-between">
            ${value}
            <a href="#" class="delete-item" onclick="removeItem(this)">
                <i class="fa-solid fa-xmark"></i>
            </a>
        </li>
                `;
    todoList.innerHTML += item;
}

function onSearch() {
    const value = searchInput.value;

    const filteredList = list.filter(item => item.toLowerCase().startsWith(value.toLowerCase()));
    appendItems(filteredList);
}

function appendItems(list) {
    todoList.innerHTML = '';

    list.forEach(item => appendItem(item));
}

function initialize() {
    list = JSON.parse(localStorage.getItem('list'));
    appendItems(list);
}

function deleteAll() {
    todoList.innerHTML = '';
    list = [];
    localStorage.setItem("list", JSON.stringify(list));
}

initialize();

searchInput.addEventListener('input', onSearch);

form.addEventListener('submit', event => {
    event.preventDefault();
    const value = todoInput.value;
    addItem(value);
});


deleteAllButton.addEventListener('click', deleteAll);