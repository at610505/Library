showData();
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {

}

Display.prototype.add = function(book){
    let libraryData = localStorage.getItem('libraryData');
    
    if (libraryData === null) {
        library = [];
    }
    else{
        library = JSON.parse(libraryData)
    }
    library.push(book);
    localStorage.setItem('libraryData',JSON.stringify(library));
    showData();

}

Display.prototype.clear = function(book){
let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.validate = function(book){
    if(book.name.length < 2 || book.author.length < 2){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(type,displayMessage){
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(() => {

        message.innerHTML="";

    }, 3000);

}

function showData(){

    let libraryData = localStorage.getItem('libraryData');
    
    if (libraryData === null) {
        library = [];
    }
    else{
        library = JSON.parse(libraryData)
    }
    let tBody = document.getElementById("tableBody");
    let uiString='';
    library.forEach((element,index) => {
        uiString +=`      <tr>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.type}</td>
                                <button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button>
                            </tr>`;
    });
    if (library.length != 0) {
        tBody.innerHTML = uiString;
    }
    else{
        tBody.innerHTML="No book has issued";
    }
}

function deleteBook(index){
    
    let libraryData = localStorage.getItem('libraryData');
    
    if (libraryData === null) {
        library = [];
    }
    else{
        library = JSON.parse(libraryData)
    }
    library.splice(index,1);
    localStorage.setItem('libraryData',JSON.stringify(library));
    showData();
}

let libraryFormSubmit = document.getElementById("libraryForm");
libraryFormSubmit.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;

    let finction = document.getElementById("fiction");
    let ComputerScience = document.getElementById("computerScience");
    let cooking = document.getElementById("cooking");

    if (finction.checked) {
        type = finction.value;
    }
    else if (ComputerScience.checked) {
        type = ComputerScience.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name,author,type);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success","You Have Successfully submitted the form");
    }
    else{
        display.show("danger","There is an error")
    }



  e.preventDefault();
}
