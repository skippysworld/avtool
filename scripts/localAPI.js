let storedDB;
const search = document.querySelector("#search");
const resultsAbbr = document.querySelector("#results-abbr");

export function fetchLocalAPI() {
	try {
		fetch("./data/abbr.json")
			.then((response) => response.json())
			.then((data) => {
				storedDB = data.data;
				render();
			});
	} catch (error) {
		console.error(error.message);
	}
}

const render = (query = "") => {
	const cleanQuery = query.toLowerCase().trim();
	const filtered = storedDB.filter((item) => {
		if (item.abbr.toLowerCase().includes(cleanQuery)) {
			return item;
		}
	});

	resultsAbbr.innerHTML = "";
	filtered.forEach((item) => {
		resultsAbbr.insertAdjacentHTML(
			"beforeend",
			`<li>
                <h2 class="abbrKey">${item.abbr}</h2>
                <p class="abbrEN">${item.en.toLowerCase()}</p>
                <p class="abbrCZ">${item.cz.toLowerCase()}</p>
            </li>`
		);
	});
};

search.addEventListener("keyup", (event) => {
	event.preventDefault();
	render(search.value);
});

fetchLocalAPI();
