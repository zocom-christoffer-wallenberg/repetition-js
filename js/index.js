
let groupKey = '';
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

async function setBook() {
	//Set a new book with key title and a book title (value)
	const url = baseURL + `api-db.php?op=set&key=title&value=En studie i rött&group=${groupKey}`;

	let response = await fetch(url);
	let data = await response.json();

	console.log(data);
}

async function getBooks() {
	//Get all books with key title
	const url = baseURL + `api-db.php?op=get&group=${groupKey}&key=title`;

	let response = await fetch(url);
	let data = await response.json();

	console.log(data);
}

document.querySelector('#addBook').addEventListener('click', () => {
	//Get title from input field
	//Add a book
	setBook();
});

document.querySelector('#getAllBooks').addEventListener('click', () => {
	//Get all books and display them to the user
	getBooks();

});

//Only do this once take the key from the console and paste it in variable groupKey
getKey();