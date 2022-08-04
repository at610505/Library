// console.log("This is ES6 version of script");
showData();
class Book{
    constructor(name,author,genre){
        this.name = name;
        this.author=author;
        this.genre=genre;
    }
}
class Display{
        add(book) {
            let libraryData = localStorage.getItem('libraryData');
            let library;
    
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

    clear(){
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    validate(book){
        if( book.name.length<3 || book.author.length<3 ){
            return false;
        }
        else{
            return true;
        }
    }

    show(alert,displayMessage){
        let message = document.getElementById("message");
        let boldText;
        if(alert==='success'){
            boldText="Congratulations!"
        }
        else{
            boldText="Error!"
        }
        message.innerHTML += `
                        <div class="alert alert-${alert} alert-dismissible fade show" role="alert">
                            <strong>${boldText}</strong> ${displayMessage}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        
                        `
        setTimeout(() => {
            message.innerHTML = ``
        }, 5000);
    }
}


function showData(){

    let libraryData = localStorage.getItem('libraryData');
    let library;

    if (libraryData === null) {
        library = [];
    }
    else{
        library = JSON.parse(libraryData);
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
    let library;

    
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

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit",libraryFormSubmit);

function libraryFormSubmit(e){
    console.log("You have submitted the form successfully");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let genre;
    
    let fiction = document.getElementById("fiction");
    let computerScience = document.getElementById("computerScience");
    let cooking = document.getElementById("cooking");
    
    if(fiction.checked){
        genre = fiction.value;
    }
    
    else if(computerScience.checked){
        genre = computerScience.value;
    }
    
    else if(cooking.checked){
        genre = cooking.value;
    }
    let book = new Book(name,author,genre);
    console.log(book);
    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show("success","You have successfully add the book");
    }
    else{
        
        display.show("danger","You made a mistake , You can not add this book");
    }
    e.preventDefault();
    
}