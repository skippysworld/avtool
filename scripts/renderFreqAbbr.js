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
						<div class="li-title">
							<h2>${item.icao}</h2>
							<p>${item.freq}</p>
						</div>
						<div class="li-content">
							<div class="li-content-main">
								<h3>callsign</h3>
								<p>${item.callsign}</p>
							</div>
							<div class="li-content-aside">
								<h3>type</h3>
								<p>${item.note}</p>
							</div>
						</div>
					</li>`
				);
			} else {
				resultsFREQ.insertAdjacentHTML(
					"beforeend",
					`<li>
						<div class="li-title">
							<h2>${item.icao}</h2>
							<p>${item.freq}</p>
						</div>
						<div class="li-content">
							<div class="li-content-main">
								<h3>callsign</h3>
								<p>${item.callsign}</p>
							</div>
							<div class="li-content-aside">
								<h3></h3>
								<p>${item.note}</p>
							</div>
						</div>
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
					<div class="li-title">
						<h2>${item.abbr}</h2>
						<p></p>
					</div>
					<p>${item.en}</p>
					<p class="li-sidenote">${item.cz}</p>
				</li>`
			);
		});
	}
};
