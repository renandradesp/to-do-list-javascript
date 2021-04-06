//Select Elements
const refresh = document.querySelector(".refresh");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Class Names
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const lineThrough = 'lineThrough';

//Variable
let LIST, id;

//get item from local storage
let data = localStorage.getItem('toDo');

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    //if data isn't empty
    LIST = []
    id = 0

}

//load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
refresh.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

//Show Today's Date
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
}

const today = new Date();
date.innerHTML = today.toLocaleDateString('en-US', options);


//Add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : "";

    const item = ` 
                    <li class="item">
                    <i class="fa ${DONE} co" job='complete' id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job='delete' id="${id}"></i>
                    </li>
                 `;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, item);
}

//Add an item to the list
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to local storage
            localStorage.setItem('toDo', JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener('click', function (event) {
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem('toDo', JSON.stringify(LIST));
});
