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

async function fetch() {
	const fetchUrl = `https://aviationweather.gov/api/data/metar?ids=${station}&format=geojson&taf=true`;

	const req = new Request(fetchUrl);
	return await req.loadJSON();
}

async function fetchBadge() {
	const fetchUrl = `https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/21/1e/13/211e13de-2e74-4221-f7db-d6d2c53b4323/AppIcon-1x_U007emarketing-0-7-0-85-220.png/540x540sr.jpg`;

	let req = new Request(fetchUrl);
	return req.loadImage();
}

const api = await fetch();
const metar = api.features[1].properties.rawOb;
const taf = api.features[1].properties.rawTaf;
const badge = api.features[1].properties.fltcat;
const widgetSize = config.widgetFamily;

async function createWidget() {
	let widget = new ListWidget();

	let gradient = new LinearGradient();
	gradient.locations = [0, 1];
	gradient.colors = [new Color("141414"), new Color("323232")];
	widget.backgroundGradient = gradient;

	let stack = widget.addStack();
	stack.addImage(SFSymbol.named("airplane").image).imageSize = new Size(15, 15);

	stack.addSpacer(10);

	let title;

	if (type === "metar" || type === "taf" || type === "both") {
		title = stack.addText(type.toUpperCase());
	} else {
		title = stack.addText(`Wrong "type"!`);
	}

	stack.addSpacer();

	let badgeImage;

	if (type === "metar" || type === "both") {
		badgeImage = stack.addText(badge);
	} else if (type === "taf") {
		badgeImage = "";
	} else {
		badgeImage = stack.addText(`Wrong "type"!`);
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
		body = widget.addText(`Wrong "type"!`);
	}

	widget.addSpacer();

	title.textColor = Color.white();
	title.textOpacity = 0.7;
	title.font = Font.mediumSystemFont(13);

	badgeImage.textColor = new Color("39FF14", 0.7);
	badgeImage.font = Font.boldSystemFont(13);

	body.minimumScaleFactor = 0.5;
	body.textColor = Color.white();
	body.font = Font.systemFont(12);

	return widget;
}

const widget = await createWidget();

if (config.runsInWidget) {
	Script.setWidget(widget);
} else {
	widget.presentMedium();
}

Script.complete();
