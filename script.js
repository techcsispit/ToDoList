const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))


if(todos) {
        todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
        e.preventDefault()

        addTodo()
})

function addTodo() {
        let todoText = input.value;
    
        if (todoText) {
            const todoEl = document.createElement('li');
            todoEl.id = `todo-${todos.length}`;
    
            const todoTextEl = document.createElement('span');
            todoTextEl.classList.add('todo-text');
            todoTextEl.innerText = todoText;
            todoEl.appendChild(todoTextEl);
    
            todoEl.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    const inputEl = document.createElement('input');
                    inputEl.type = 'text';
                    inputEl.value = todoTextEl.innerText;
                    inputEl.style.backgroundColor = 'grey';
                    inputEl.style.borderRadius = '10px'; 
                    inputEl.size = 38;
                    inputEl.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            todoTextEl.innerText = inputEl.value;
                            updateLS();
                            inputEl.replaceWith(todoTextEl);
                        }
                    });
                    todoTextEl.replaceWith(inputEl);
                    inputEl.focus();
                }
            });
    
            todoEl.addEventListener('click', () => {
                handleToggleCompleted(todos.length, todoEl);
            });
    
            todoEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
    
                todoEl.remove();
                updateLS();
            });
    
            todosUL.appendChild(todoEl);
    
            input.value = '';
    
            updateLS();
        }
    }

function updateLS() {
        todosEl = document.querySelectorAll('li')

        const todos = []

        todosEl.forEach(todoEl => {
                todos.push({
                        text: todoEl.innerText,
                        completed: todoEl.classList.contains('completed')
                })
        })

        localStorage.setItem('todos', JSON.stringify(todos))
}

//Dark light mode toggle
function lightDarkToggle() {
        let lightOrDark = document.querySelector(".lightOrDark");
        let element = document.body;
        let inputBox = document.querySelector(".input");
        try {
                let todos = document.querySelector(".todos li");
                todos.classList.toggle("dark-todos");
        }
        catch(err) {
        }
        inputBox.classList.toggle("dark-input");
        element.classList.toggle("dark");
        if (lightOrDark.textContent === "☀︎") {
                lightOrDark.textContent = "☾";
            } else {
                lightOrDark.textContent = "☀︎";
            }
}

//use api
function changeQuote() {
    quoteElement.textContent = `"${productivityQuotes[currentQuoteIndex].quote}" - ${productivityQuotes[currentQuoteIndex].author}`;
    currentQuoteIndex = Math.floor(Math.random() * 10);
}

changeQuote();

setInterval(changeQuote, 10000);// Quote Generator
const quotesContainer = document.getElementById('quotes-container');
const quoteElement = document.getElementById('quote');

async function fetchQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data;
}

async function changeQuote() {
    const quote = await fetchQuote();
    quoteElement.textContent = `"${quote.content}" - ${quote.author}`;
}


setInterval(changeQuote, 10000);
