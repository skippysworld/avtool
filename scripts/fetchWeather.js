const renderedMETAR = document.querySelector("#rendered-metar");
const renderedTAF = document.querySelector("#rendered-taf");

var myHeaders = new Headers();
myHeaders.append("X-API-Key", "6c94cbb180c0458589df8c2c65");

var requestOptions = {
	method: "GET",
	headers: myHeaders,
	redirect: "follow",
};

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
