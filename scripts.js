
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBooktoLibrary(e){
    e.preventDefault();
    let newBook = new Book(document.getElementById('title').value, 
                        document.getElementById('author').value, 
                        document.getElementById('pages').value, 
                        document.getElementById('isRead').checked);
    myLibrary.push(newBook);
    makeCard(newBook, renderNumber);
    renderNumber++;
    form.reset();
    dialog.close();
}

function makeCard(book, index){

    //card container
    let cardDiv = document.createElement("div")
    cardDiv.classList.add('book');
    gridContainer.appendChild(cardDiv);

    //title
    let bookTitle = document.createElement('div');
    cardDiv.appendChild(bookTitle);
    bookTitle.textContent=book.title;

    //author
    let bookAuthor = document.createElement('div');
    cardDiv.appendChild(bookAuthor);
    bookAuthor.textContent=book.author;

    //pages
    let bookPages = document.createElement('div');
    cardDiv.appendChild(bookPages);
    bookPages.textContent=book.pages;

    //btn-container
    let btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    cardDiv.appendChild(btnContainer);

    //read button
    let readButton = document.createElement('button');
    readButton.classList.add('read-btn');
    btnContainer.appendChild(readButton);

    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    btnContainer.appendChild(deleteButton);

    //read
    if(book.read==true){
        readButton.textContent = 'Read';
        readButton.classList.add('read');
    }else if(book.read==false){
        readButton.textContent = 'Not Read';
        readButton.classList.add('unread');
    }

    // Add event listeners for new buttons
    readButton.addEventListener('click', () => toggleIsRead(book, readButton));
    deleteButton.addEventListener('click', () => deleteBook(index, cardDiv));
}

function toggleIsRead(book, button){
    book.read = !book.read;
    if(book.read){
        button.textContent = 'Read';
        button.classList.add('read');
        button.classList.remove('unread');
    } else {
        button.textContent = 'Not Read';
        button.classList.add('unread');
        button.classList.remove('read');
    }
}

function deleteBook(index, cardDiv){
    myLibrary.splice(index, 1);
    cardDiv.remove();
    renderNumber--;
}

function loadLibrary(){
    for(let i = 0;i<=myLibrary.length-1;i++){
        makeCard(myLibrary[i])
    }
}

bookOne = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K Rowling', 223, true);
bookTwo = new Book('Diary of a Wimpy Kids: Hot Mess', 'Jeff Kinney', 224, false);

const myLibrary = [bookOne, bookTwo];

const bookContainer = document.querySelector(".book-container");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector('#btn-new-book');
const closeButton = document.querySelector('.close-btn');
const addBookButton = document.querySelector('.submit-btn');
const readButtonAll = document.querySelectorAll('.read-btn');
const deleteButtonAll = document.querySelectorAll('.delete-btn');
const gridContainer = document.querySelector('.book-container');
const form = document.querySelector('form');

let renderNumber = myLibrary.length - 1;

addBookButton.addEventListener("click", (e) => {
    addBooktoLibrary(e);
    console.log(myLibrary);
});

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

loadLibrary();