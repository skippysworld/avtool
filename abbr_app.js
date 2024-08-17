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
                <p class="abbrKey">${item.abbr}</p>
                <p class="abbrEN">${item.en}</p>
                <p class="abbrCZ">${item.cz}</p>
            </li>`
		);
	});
};

abbrSearch.addEventListener("keyup", (event) => {
	event.preventDefault();
	render(abbrSearch.value);
});

fetchAPI();
