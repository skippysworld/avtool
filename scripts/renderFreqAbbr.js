import { storedDatabaseFREQ, storedDatabaseABBR } from "./fetchFreqAbbr.js";

const search = document.querySelector("#search");
const resultsFREQ = document.querySelector("#results-freq");
const resultsABBR = document.querySelector("#results-abbr");

export const renderResults = (query = "") => {
	const cleanQuery = query.toLowerCase().trim();

	if (search.getAttribute("data-db") == "freq") {
		const filtered = storedDatabaseFREQ.filter((item) => {
			if (item.icao.toLowerCase().includes(cleanQuery)) {
				return item;
			}
		});

		resultsFREQ.innerHTML = "";

		filtered.forEach((item) => {
			if (item.icao.includes("LK")) {
				resultsFREQ.insertAdjacentHTML(
					"beforeend",
					`<li>
						<div class="li-row">
							<h2 class="li-title">${item.icao}</h2>
							<p class="li-title-aside">${item.freq}</p>
						</div>
						<p class="li-main">Callsign: ${item.callsign}</p>
						<p class="li-sidenote">Type: ${item.note}</p>
					</li>`
				);
			} else {
				resultsFREQ.insertAdjacentHTML(
					"beforeend",
					`<li>
						<div class="li-row">
							<h2 class="li-title">${item.icao}</h2>
							<p class="li-title-aside">${item.freq}</p>
						</div>
						<p class="li-main">Callsign: ${item.callsign}</p>
						<p class="li-sidenote">${item.note}</p>
					</li>`
				);
			}
		});
	} else if (search.getAttribute("data-db") == "abbr") {
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
					<div class="li-row">
						<h2 class="li-title">${item.abbr}</h2>
						<p class="li-title-aside"></p>
					</div>
					<p class="li-main">${item.en}</p>
					<p class="li-sidenote">${item.cz}</p>
				</li>`
			);
		});
	}
};
