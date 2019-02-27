//==== Set Global Variables & State ====//
const listPanelEl = document.querySelector('#list')
const showPanelEl = document.querySelector('#show-panel')
let STATE_currentUser = { "id": 1, "username": "pouros" }

//==== Initialize Page ====//
document.addEventListener("DOMContentLoaded", function() {
    initialize()
})
const initialize = () => {
    getBooks().then(drawBookList)
}

//==== Draw Functions ====///
// draw a single book to the list panel
const drawBookListItem = book => {
    const bookListEl = document.createElement('li')
    bookListEl.innerText = book.title
    bookListEl.addEventListener('click', () => {
        drawBookCard(book)
    })
    listPanelEl.appendChild(bookListEl)
}
// draw an array of books 
const drawBookList = books => {
    books.forEach(drawBookListItem)
}
const drawBookCard = book => {
    const bookCardEl = document.createElement('div')
    bookCardEl.innerHTML = bookCardInnerHTML(book)
    bookCardEl.querySelector('button').addEventListener('click', likeBook(book))
    showPanelEl.innerHTML = ''
    showPanelEl.appendChild(bookCardEl)
}
const bookCardInnerHTML = book =>
    `<h1>${book.title}</h1>
    <img src="${book.img_url}" alt="${book.title}"/>
    <p>${book.description}</p>
    <button>${currentUserLikedBook(book) ? `👎🏻 UnLike ${book.title}` : `👍🏻Like ${book.title}`}</button>
    <h4>Liked By:</h4>
    <ul> ${book.users.map(user => `
        <li> ${user.username} </li>`).join('')}
    </ul>`

// event handler for user liking / disliking a book 
const likeBook = book => event => {
    if (currentUserLikedBook(book)){
        book.users = book.users.filter(user => user.id !== STATE_currentUser.id)
    } else {
        book.users.push(STATE_currentUser)
    }
    patchBook(book)
    drawBookCard(book)
}
// find out if current user has liked a given book
const currentUserLikedBook = book => {
    return book.users.find(user => user.id === STATE_currentUser.id)
}