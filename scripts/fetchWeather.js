const renderedMETAR = document.querySelector("#rendered-metar");
const renderedTAF = document.querySelector("#rendered-taf");

function fetchMETAR(station = "lkpr") {
	fetch(`https://aviationweather.gov/api/data/metar?ids=lkpr&format=json`, {
		method: "post",
		mode: "no-cors",
	})
		.then((response) => console.log(response)) //.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

// function fetchTAF(station = "lkpr") {
// 	fetch(`https://aviationweather.gov/api/data/taf?ids=${station}&format=json`)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

fetchMETAR();
// fetchTAF();
