import { storedDatabaseFREQ, storedDatabaseABBR } from "./fetchLocalData.js";
import { storedDatabaseMETAR, storedDatabaseTAF } from "./fetchAPI.js";

const searchItem = document.querySelector("#search");
const resultsMETAR = document.querySelector("#results-metar");
const resultsFREQ = document.querySelector("#results-freq");
const resultsABBR = document.querySelector("#results-abbr");

export const renderResults = (query = "") => {
	const cleanQuery = query.toLowerCase().trim();

	if (searchItem.getAttribute("data-db") == "freq") {
		const filtered = storedDatabaseFREQ.filter((item) => {
			if (item.icao.toLowerCase().includes(cleanQuery)) {
				return item;
			}
		});

		resultsFREQ.innerHTML = "";

		filtered.forEach((item) => {
			resultsFREQ.insertAdjacentHTML(
				"beforeend",
				`<li>
					<h2>${item.icao}</h2>
					<p>${item.freq.toLowerCase()}</p>
					<p class="sidenote">${item.callsign.toLowerCase()}</p>
				</li>`
			);
		});
	} else if (searchItem.getAttribute("data-db") == "abbr") {
		const filtered = storedDatabaseABBR.filter((item) => {
			if (item.abbr.toLowerCase().includes(cleanQuery)) {
				return item;
			}
		});

		resultsABBR.innerHTML = "";

		filtered.forEach((item) => {
			resultsABBR.insertAdjacentHTML(
				"beforeend",
				`<li>
				<h2>${item.abbr}</h2>
				<p>${item.en.toLowerCase()}</p>
				<p class="sidenote">${item.cz.toLowerCase()}</p>
			</li>`
			);
		});
	}
};

export const renderWeather = () => {
	resultsMETAR.insertAdjacentHTML(
		"beforeend",
		`<li>
			<h2>LKPR</h2>
			<p>${storedDatabaseMETAR}</p>
			<p class="sidenote">${storedDatabaseTAF}</p>
		</li>`
	);
};
