export let storedDatabaseMETAR;
export let storedDatabaseTAF;

function fetchMETAR() {
	try {
		fetch("https://aviationweather.gov/api/data/metar?ids=LKPR&format=raw", {
			headers: {
				accept: "*/*",
			},
		})
			.then((response) => console.log(response) /* response.json()*/)
			.then((data) => {
				storedDatabaseMETAR = data;
			});
	} catch (error) {
		console.error(error.message);
	}
}

function fetchTAF() {
	try {
		fetch("https://aviationweather.gov/api/data/taf?ids=LKPR&format=raw", {
			headers: {
				accept: "*/*",
			},
		})
			.then((response) => console.log(response) /* response.json()*/)
			.then((data) => {
				storedDatabaseTAF = data;
			});
	} catch (error) {
		console.error(error.message);
	}
}

fetchMETAR();
fetchTAF();
