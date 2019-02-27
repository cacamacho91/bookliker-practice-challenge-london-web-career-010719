//==== API Calls ====//
const baseURL = 'http://localhost:3000'
const bookURL = baseURL + '/books'
const userURL = baseURL + '/users'

// all calls return promises to enable async 

// return all the books (in a promise)
const getBooks = () => fetch(bookURL).then(resp => resp.json())

// patches a book and returns the new book (in a promise)
const patchBook = book => {
    return fetch(`${bookURL}/${book.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    }).then(resp => resp.json())
}