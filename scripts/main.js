import { renderResults } from "./renderFreqAbbr.js";

const search = document.querySelector("#search");
const navItems = document.querySelectorAll(".nav-item");
const sectionItems = document.querySelectorAll(".section-item");

const navMetar = document.querySelector(".nav-metar");
const navFreq = document.querySelector(".nav-freq");
const navAbbr = document.querySelector(".nav-abbr");
const navInfo = document.querySelector(".nav-info");

const sectionMetar = document.querySelector(".section-metar");
const sectionFreq = document.querySelector(".section-freq");
const sectionAbbr = document.querySelector(".section-abbr");
const sectionInfo = document.querySelector(".section-info");

const switchPage = (nav, searchDB, section) => {
	search.value = "";

	navItems.forEach((item) => {
		item.classList.remove("nav-item-active");
	});
	sectionItems.forEach((item) => {
		item.setAttribute("hidden", "true");
	});

	nav.classList.add("nav-item-active");
	section.hidden = false;

	if (searchDB == "hidden" || searchDB == "metar") {
		search.hidden = true;
	} else {
		search.hidden = false;
		search.setAttribute("data-db", searchDB);
	}
	renderResults();
};

navItems.forEach((item) => {
	item.addEventListener("click", (event) => {
		event.preventDefault();

		item.classList.add("nav-item-active");

		if (item.classList.contains("nav-metar")) {
			switchPage(navMetar, "metar", sectionMetar);
		} else if (item.classList.contains("nav-freq")) {
			switchPage(navFreq, "freq", sectionFreq);
		} else if (item.classList.contains("nav-abbr")) {
			switchPage(navAbbr, "abbr", sectionAbbr);
		} else if (item.classList.contains("nav-info")) {
			switchPage(navInfo, "hidden", sectionInfo);
		}
	});
});

search.addEventListener("keyup", (event) => {
	event.preventDefault();
	renderResults(search.value);
});
