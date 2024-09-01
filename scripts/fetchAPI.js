import { requestOptions } from "./auth.js";

const renderedMETAR = document.querySelector("#rendered-metar");
const renderedTAF = document.querySelector("#rendered-taf");

function fetchMETAR() {
	fetch("https://api.checkwx.com/metar/LKPR", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			renderedMETAR.innerHTML = data.data[0];
		})
		.catch((error) => {
			console.log(error);
		});
}

function fetchTAF() {
	fetch("https://api.checkwx.com/taf/LKPR", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			renderedTAF.innerHTML = data.data[0];
		})
		.catch((error) => {
			console.log(error);
		});
}

fetchMETAR();
fetchTAF();
