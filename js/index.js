
/*
	1. Hämta en group (API-nyckel).
	2. Spara en boktitel som användaren kan skriv in i ett inputfält
	3. Hämta alla böcker och visa för användaren.
	4. Kunna rensa biblioteket från alla böcker.
*/

let groupKey = '2GmWK';
const baseURL = 'https://www.forverkliga.se/JavaScript/api/';

async function getKey() {
	//Get a group key only once then hard code it into the variable groupKey.
	const url = baseURL + 'api-db.php?requestGroup';

	//Fetch url
	let response = await fetch(url);
	//Transform to json and save in data
	let data = await response.json();

	groupKey = await data.key;
}

function showMessage() {
	document.querySelector('#success-message').innerHTML = 'Boken har sparats!';

	setTimeout(removeMessage, 2000);
}

function removeMessage() {
	document.querySelector('#success-message').innerHTML = '';
}

async function setBook(title) {
	//Set a new book with key title and a book title (value)
	const url = baseURL + `api-db.php?op=set&key=title&value=${title}&group=${groupKey}`;
	console.log('URL is: ', url);
	let response = await fetch(url);
	let data = await response.json();

	showMessage();
	getBooks();

	console.log(data);
}

function displayBooks(books) {
	//Get element with id books
	//loop through variable books
	//Create p-tag for each book and add the book title to the p-tag
	//Append p-tag to parent element

	let booksElem = document.querySelector('#books');

	booksElem.innerHTML = ''

	for(book of books.data) {
		let elem = document.createElement('p');
		elem.innerHTML = book.value;
		booksElem.append(elem);
	}
}

async function getBooks() {
	//Get all books with key title
	const url = baseURL + `api-db.php?op=get&group=${groupKey}&key=title`;

	let response = await fetch(url);
	let data = await response.json();

	displayBooks(data);
}

async function removeBooks() {
	//Remove all books with key title
	const url = baseURL + `api-db.php?op=remove&group=${groupKey}&key=title`;

	let response = await fetch(url);
	let data = await response.json();

	console.log(data);
}

document.querySelector('#addBook').addEventListener('click', () => {
	//Get title from input field
	//Add a book
	let bookTitle = document.querySelector('#book-title').value;
	removeMessage();
	setBook(bookTitle);
});

document.querySelector('#getAllBooks').addEventListener('click', () => {
	//Get all books and display them to the user
	getBooks();
});

document.querySelector('#removeAllBooks').addEventListener('click', () => {
	removeBooks();
});

//Only do this once take the key from the console and paste it in variable groupKey
//getKey();