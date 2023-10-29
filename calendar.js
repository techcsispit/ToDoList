let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month > 11 || month < 0) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

//Dark light mode toggle
let homeIcon = document.querySelector("#home-img");
let imgSrc= homeIcon.src;
if(localStorage.getItem('preference')=='dark') {
    lightDarkToggle(1);
}
function lightDarkToggle(flag) {
    let lightOrDark = document.querySelector(".lightOrDark");
    let element = document.body;
    if(flag==0) {
        if(localStorage.getItem('preference')=='dark') {
            localStorage.setItem('preference', 'light');
        }
        else {
            localStorage.setItem('preference', 'dark')
        }
    }
    if (homeIcon.src == imgSrc) {
        homeIcon.src= "public/images/to-do-list-dark.png";
    }
    else {
        homeIcon.src="public/images/to-do-list.png";
    }

    element.classList.toggle("dark");
    if (lightOrDark.textContent === "☀︎") {
        lightOrDark.textContent = "☾";
        lightOrDark.style.color = "white";
      } else {
        lightOrDark.textContent = "☀︎";
        lightOrDark.style.color = "#444444";
      }
}

//Themes logic
const themes = ["lavender", "orange", "aqua", "lime"];
let index=themes.findIndex((theme) => theme == localStorage.getItem('themePreference'));
theme(index);

function theme(color) {
    let header = document.querySelector("h3");
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
        let currDate = document.querySelector(".calendar-days div.curr-date");
        currDate.classList.remove(...themes);
        currDate.classList.add(preference);
    }
    catch(err) {}
      
      themeIcon.classList.remove(...themes);
      header.classList.remove(...themes);
      themeIcon.classList.add(preference);
      header.classList.add(preference);
      
}
