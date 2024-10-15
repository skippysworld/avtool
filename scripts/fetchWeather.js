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
			const regex = /\b(FM|BECMG|TEMPO|PROB.0|RMK)\b/gi;
			const dataResult = data.features[1].properties.rawTaf;
			const splitTaf = data.split(regex);
			const introTaf = splitTaf[0];
			const restTaf = splitTaf.slice(1);
			let resultTaf = "";

			for (const part of restTaf) {
				if (part.match(regex)) {
					resultTaf += `\n${part}`;
				} else {
					resultTaf += part;
				}
			}
			renderedTAF.innerHTML = introTaf + "\n" + resultTaf;
		})
		.catch((error) => {
			console.log(error);
		});
}

fetchMETAR();
fetchTAF();
