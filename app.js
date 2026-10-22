// select DOM Elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const themeBtn = document.getElementById("theme-btn");

// Try to load saved todos from localStorage(If any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  // save current todos array to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  // checkbox to  toggle completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // text to todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // ADD double-click event listener to edit todo
  // textSpan.addEventListener("dblclick", () => {
  //   const newText = prompt("Edit todo", todo.text);     // intial value
  //   if (newText !== null && newText.trim() !== "") {
  //     todo.text = newText.trim();
  //     saveTodos();
  //     render();
  //   }
  // });

  // delete todo button

  const delBtn = document.createElement("button");
  delBtn.textContent = "⛔";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1); // it takes starting points and delete count
    render(); // need
    saveTodos();
  });

  // Edit Button

const editBtn = document.createElement("button");
editBtn.textContent = "✏️";

editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "✓";
  

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "✕";
   

    textSpan.replaceWith(editInput);
    editBtn.replaceWith(saveBtn);
    li.insertBefore(cancelBtn, delBtn);

   editInput.focus();

    saveBtn.addEventListener("click", () => {
        const newText = editInput.value.trim();

        if (newText !== "") {
            todo.text = newText;
            saveTodos();
            render();
        }
    });

    cancelBtn.addEventListener("click", () => {
        render();
    });

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveBtn.click();
        }

        if (e.key === "Escape") {
            cancelBtn.click();
        }
    });
});

 li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  return li;
}

// render the whole todo list from todos array
function render() {
  list.innerHTML = "";

  // Recreate each item
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index); //  todo is object
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    // if empty then
    return;
  }

  // push a new todo object
  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
render();

// dark light mode code


// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeBtn.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});