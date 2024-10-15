const renderedMETAR = document.querySelector("#rendered-metar");
const renderedTAF = document.querySelector("#rendered-taf");

function fetchMETAR() {
	fetch(
		"https://rdmvggvcpe.eu-west-1.awsapprunner.com/https://aviationweather.gov/api/data/metar?ids=LKPR&format=raw&format=geojson&taf=true"
	)
		.then((response) => response.json())
		.then((data) => {
			renderedMETAR.innerHTML = data.features[1].properties.rawOb;
		})
		.catch((error) => {
			console.log(error);
		});
}

function fetchTAF() {
	fetch(
		"https://rdmvggvcpe.eu-west-1.awsapprunner.com/https://aviationweather.gov/api/data/metar?ids=LKPR&format=raw&format=geojson&taf=true"
	)
		.then((response) => response.json())
		.then((data) => {
			renderedTAF.innerHTML = data.features[1].properties.rawTaf;
		})
		.catch((error) => {
			console.log(error);
		});
}

fetchMETAR();
fetchTAF();
