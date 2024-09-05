const renderedMETAR = document.querySelector("#rendered-metar");
const renderedTAF = document.querySelector("#rendered-taf");

let station = "lkpr";

const fetchMETAR = await fetch(
	`https://aviationweather.gov/api/data/metar?ids=${station}&format=json`
);

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
