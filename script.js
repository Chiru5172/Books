let books = [];
let borrowingHistory = [];

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const book = { title, author, category, borrowed: false };
    books.push(book);
    displayBooks();
    this.reset();
});

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book' + (book.borrowed ? ' borrowed' : '');
        bookDiv.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} (Category: ${book.category})
            <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookList.appendChild(bookDiv);
    });
}

function borrowBook(index) {
    books[index].borrowed = !books[index].borrowed;
    if (books[index].borrowed) {
        borrowingHistory.push(books[index]);
    } else {
        // Remove the book from borrowing history if returned
        borrowingHistory = borrowingHistory.filter(book => book.title !== books[index].title);
    }
    displayBooks();
    displayBorrowingHistory();
}

function displayBorrowingHistory() {
    const historyDiv = document.getElementById('borrowingHistory');
    historyDiv.innerHTML = '';

    if (borrowingHistory.length === 0) {
        historyDiv.innerHTML = '<p>No borrowing history.</p>';
        return;
    }

    borrowingHistory.forEach(book => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} (Category: ${book.category})`;
        historyDiv.appendChild(historyItem);
    });
}

function searchBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) || 
        book.category.toLowerCase().includes(searchTerm)
    );

    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book' + (book.borrowed ? ' borrowed' : '');
        bookDiv.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} (Category: ${book.category})
            <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookList.appendChild(bookDiv);
    });
}