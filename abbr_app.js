let storedDB;
const abbrSearch = document.querySelector("#abbr-search");
const abbrResults = document.querySelector("#abbr-results");

function fetchAPI() {
	try {
		fetch("./data/api/abbr_db.json")
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

	abbrResults.innerHTML = "";
	filtered.forEach((item) => {
		abbrResults.insertAdjacentHTML(
			"beforeend",
			`<li>
                <h2 class="abbrKey">${item.abbr}</h2>
                <p class="abbrEN">${item.en.toLowerCase()}</p>
                <p class="abbrCZ">${item.cz.toLowerCase()}</p>
            </li>`
		);
	});
};

abbrSearch.addEventListener("keyup", (event) => {
	event.preventDefault();
	render(abbrSearch.value);
});

fetchAPI();
