export let storedDatabaseFREQ;
export let storedDatabaseABBR;

function fetchFREQ() {
	try {
		fetch("./data/freq.json")
			.then((response) => response.json())
			.then((data) => {
				storedDatabaseFREQ = data.data;
			});
	} catch (error) {
		console.error(error.message);
	}
}

function fetchABBR() {
	try {
		fetch("./data/abbr.json")
			.then((response) => response.json())
			.then((data) => {
				storedDatabaseABBR = data.data;
			});
	} catch (error) {
		console.error(error.message);
	}
}

fetchFREQ();
fetchABBR();
