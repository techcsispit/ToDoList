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

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
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

//Themes logic
const themes = ["lavender", "orange", "aqua", "lime"];
let index=themes.findIndex((theme) => theme == localStorage.getItem('themePreference'));
theme(index);

function theme(color) {
    let header = document.querySelector("h3");
    let inputBox = document.querySelector(".input");
    let themeIcon = document.querySelector(".theme-icon");
    if (color==0) {
        localStorage.setItem('themePreference', 'lavender');
    }
    if (color==1) {
        localStorage.setItem('themePreference', 'orange');
    }
    if (color==2) {
        localStorage.setItem('themePreference', 'aqua');
    }
    if (color==3) {
        localStorage.setItem('themePreference', 'lime');
    }
    let preference=localStorage.getItem('themePreference');
      try {
         let todos = document.querySelector(".todos");
         todos.classList.remove(...themes);
         todos.classList.add(preference);
       }
       catch(err) {
      }
      themeIcon.classList.remove(...themes);
      header.classList.remove(...themes);
      inputBox.classList.remove(...themes);
      themeIcon.classList.add(preference);
      header.classList.add(preference);
      inputBox.classList.add(preference);
}



//Dark light mode toggle
let calIcon = document.querySelector("#cal");
let imgSrc= calIcon.src;
if(localStorage.getItem('preference')=='dark') {
    lightDarkToggle(1);
}
function lightDarkToggle(flag) {
    let lightOrDark = document.querySelector(".lightOrDark");
    let element = document.body;
    let inputBox = document.querySelector(".input");
    if(flag==0) {
        if(localStorage.getItem('preference')=='dark') {
            localStorage.setItem('preference', 'light');
        }
        else {
            localStorage.setItem('preference', 'dark')
        }
    }

    try {
        let todos = document.querySelector(".todos li");
        todos.classList.toggle("dark-todos");
    }
    catch(err) {
    }
    if (calIcon.src == imgSrc) {
        calIcon.src= "public/images/calendar-dark.png";
    }
    else {
        calIcon.src="public/images/calendar.png";
    }
    inputBox.classList.toggle("dark-input");
    element.classList.toggle("dark");
    if (lightOrDark.textContent === "☀︎") {
        lightOrDark.textContent = "☾";
        lightOrDark.style.color = "white";
      } else {
        lightOrDark.textContent = "☀︎";
        lightOrDark.style.color = "#444444";
      }
}

const quotesContainer = document.getElementById('quotes-container');
const quoteElement = document.getElementById('quote');

function getQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            quoteElement.textContent = `"${data.content}" - ${data.author}`;
        })
        .catch(error => {
            console.log(error);
        });
}

getQuote();

setInterval(getQuote, 10000);

