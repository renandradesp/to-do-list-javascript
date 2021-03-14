//Select Elements
const refresh = document.querySelector(".refresh");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Class Names
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const lineThrough = 'lineThrough';

//Show Today's Date
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
}
const today = new Date();
date.innerHTML = today.toLocaleDateString('en-US', options);

//Add to do function
function addToDo(toDo) {

    const item = ` 
                    <li class="item">
                    <i class="fa fa-circle-thin co" job='complete' id='0'></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job='delete' id='0'></i>
                    </li>
                 `;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, item);
}

const test = 'test'
addToDo(test);
alert('qualquer')
console.log(test)
