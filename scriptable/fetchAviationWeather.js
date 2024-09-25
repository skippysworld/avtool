//-----------------------------------------
//
// Fetch aviation weather from aviationweather.com (NOAA). Script takes and parse a parameter passed to the widget
//
// Parameter format (not case-sensitive):
//
//    "type station"
//
// Options:
//
//    type - METAR / TAF / BOTH
//    station - ICAO ID, eg: "LKPR"
//
// Example:
//
//    "metar lkpr" / "Taf LKPR"
//
//------------------------------------------

let encodeParam = "metar lkpr"; // args.widgetParameter
const decodeParam = encodeParam.toLowerCase().split(" ");

const type = decodeParam[0];
const station = decodeParam[1];

async function fetchData() {
	const fetchUrl = `https://aviationweather.gov/api/data/metar?ids=${station}&format=geojson&taf=true`;

	const req = new Request(fetchUrl);
	return await req.loadJSON();
}

const apiData = await fetchData();
const metar = apiData.features[1].properties.rawOb;
const taf = apiData.features[1].properties.rawTaf;
const category = apiData.features[1].properties.fltcat;

async function fetchImage() {
	const fetchUrl = `https://skippysworld.github.io/avtool/scriptable/${category}.png`;

	const req = new Request(fetchUrl);
	return await req.loadImage();
}

const apiImage = await fetchImage();

async function createWidget() {
	let widget = new ListWidget();
	widget.setPadding(25, 25, 25, 25);

	let gradient = new LinearGradient();
	gradient.locations = [0, 1];
	gradient.colors = [new Color("141414"), new Color("323232")];
	widget.backgroundGradient = gradient;

	let stackTop = widget.addStack();
	stackTop.addImage(SFSymbol.named("airplane").image).imageSize = new Size(
		15,
		15
	);

	stackTop.addSpacer(10);

	let title;

	if (type === "metar" || type === "taf" || type === "both") {
		title = stackTop.addText(type.toUpperCase());
	} else {
		title = stackTop.addText(`Fetch Aviation Weather`);
	}

	stackTop.addSpacer();

	let badge;

	if (type === "metar" || type === "both") {
		badge = stackTop.addImage(apiImage);
	} else {
		badge = "";
	}

	widget.addSpacer();

	let body;

	if (type === "metar") {
		body = widget.addText(metar);
	} else if (type === "taf") {
		body = widget.addText(taf);
	} else if (type === "both") {
		body = widget.addText("METAR + TAF is not available yet.");
	} else {
		body = widget.addText(
			`Widget parameter has not been provided or has wrong format. Check widget settings.`
		);
	}

	widget.addSpacer();

	let stackBottom = widget.addStack();

	stackBottom.addSpacer();

	let source = stackBottom.addText("Data source: AWC (NOAA)");

	title.textColor = Color.white();
	title.textOpacity = 0.7;
	title.font = Font.mediumSystemFont(13);

	badge.imageSize = new Size(37.5, 15);
	badge.cornerRadius = 5;
	badge.textColor = new Color("39FF14", 0.7);
	badge.font = Font.boldSystemFont(13);

	body.minimumScaleFactor = 0.5;
	body.textColor = Color.white();
	body.font = Font.systemFont(12);

	source.textColor = Color.white();
	source.textOpacity = 0.2;
	source.font = Font.systemFont(8);

	return widget;
}

const widget = await createWidget();

if (config.runsInWidget) {
	Script.setWidget(widget);
} else {
	widget.presentMedium();
}

Script.complete();
