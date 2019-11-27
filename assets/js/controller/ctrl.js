window.addEventListener('load', init);
function init() {
    bindEvents();
    showAndHideSort();
    showHide();
    counter();
}

function bindEvents() {
    document.querySelector('#add').addEventListener('click', add);
    document.querySelector('#update').addEventListener('click', update);
    document.querySelector('#sort').addEventListener('click', showAndHideSort);
    document.querySelector('#clear').addEventListener('click', clearAll);
    document.querySelector('#search').addEventListener('click', showHide);
    document.querySelector('#srchvalue').addEventListener('change', inputSrch);
    document.querySelector('#delete').addEventListener('click',deleteBooks);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);
}
//Counter
function counter() {
document.querySelector('#len').innerText = bookOperations.books.length;
}
//Add
function add() {
    var bookObject = new Book();
    for (let key in bookObject) {
        if (key == 'isMarked') {
            continue;
        }
        bookObject[key] = document.querySelector('#' + key).value;
    }
    bookOperations.add(bookObject);
    print(bookObject);
    counter();
}
//Print
function print(bookObject) {
    var tbody = document.querySelector('#booktbl');
    var tr = tbody.insertRow();
    var index = 0;

    for (let key in bookObject) {
        if (key == 'isMarked') {
            continue;
        }
        tr.insertCell(index).innerText = bookObject[key];
        index++;
    }
    var td = tr.insertCell(index);
    td.appendChild(createIcon('fas fa-trash pointer common', toggleRed, bookObject.id));
    td.appendChild(createIcon('fas fa-edit pointer', edit, bookObject.id));
    counter();
}
function createIcon(className, fn, id) {
    var icon = document.createElement('i');
    icon.className = className;
    icon.setAttribute('pid', id);
    icon.addEventListener('click', fn);
    return icon;
}
//Toggle Red
function toggleRed() {
    var id = this.getAttribute('pid');
    this.parentNode.parentNode.classList.toggle('alert-danger');
    bookOperations.mark(id);
}
function edit() {
    var id = this.getAttribute('pid');
    var obj = bookOperations.editbook(id);

    for (let ob in obj) {
        if (obj[ob] == 'isMarked') {
            continue;
        }
        document.querySelector('#' + ob).value = obj[ob];
    }

}
//Update
function update() {

}
//Sort
function showAndHideSort() {
    document.querySelector('#sortbox').classList.toggle('disp');
    document.querySelector('#hToL').addEventListener('click', highBtn);
    document.querySelector('#lToH').addEventListener('click', lowBtn);
}
function highBtn() {
    var highArr = bookOperations.sortHigh();
    printTable(highArr);
}
function lowBtn() {
    var lowArr = bookOperations.sortLow();
    printTable(lowArr);
}

function printTable(arr) {
    document.querySelector('#booktbl').innerText = '';
    arr.forEach(print);
    counter();
}
//Clear All
function clearAll() {
    var arr = bookOperations.clearAll();
    printClear(arr);
}
function printClear() {
    document.querySelector('#booktbl').innerHTML = "";
    counter();
}
//Search
function showHide() {
    document.querySelector('#searchbox').classList.toggle('disp');
}
function inputSrch() {
    var val = document.querySelector('#srchvalue').value;
    var key = document.querySelector('#searchby').value;

    if (key != -1) {
        var arr = bookOperations.search(key, val);
        printTable(arr);
    }
}
//Delete
function deleteBooks() {
    var arr = bookOperations.delete();
    printTable(arr);
}
//LocalStorage
function save() {
    if(localStorage){
        let arr = bookOperations.books;
        let json = JSON.stringify(arr);
        localStorage.data = json;
        alert('Record Added');
        }
        else {
            alert('Your Brower Outdated');
        }
}
function load() {
if(localStorage){
    if(localStorage.data){
    bookOperations.books = JSON.parse(localStorage.data);
    var obj  = JSON.parse(localStorage.data);
    // for(let ob in obj){
    //     let bookObject = new Book(ob.id,ob.title,ob.auth,ob.isbn);
    //     bookOperations.books.push(bookObject);
    // }
    printTable(bookOperations.books);
    alert('Record Loaded');
    }
    else {
        alert('No data Existed');
    }
}
else {
    alert('Your Browser Outdated');
}
}