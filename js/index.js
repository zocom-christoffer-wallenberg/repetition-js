

const groupKey = '';

function getKey() {
	const url = 'https://www.forverkliga.se/JavaScript/api/api-db.php?requestGroup	';

	fetch(url,
		{ method: 'GET' }
	).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
		groupKey = data.key;
	}).catch(function(error) {
		console.error('ERROR: ', error);
	});
}

document.querySelector('addBook').addEventListener(() => {
	//Lägg till bok
});

document.querySelector('getAllBooks').addEventListener(() => {
	//Hämta alla böcker
});

getKey();