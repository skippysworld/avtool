const myHeaders = new Headers();
myHeaders.append("X-API-Key", "6c94cbb180c0458589df8c2c65");

export const requestOptions = {
	method: "GET",
	headers: myHeaders,
	redirect: "follow",
};
