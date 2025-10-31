// importerer pakke for å koble til database
const mysql = require("mysql2/promise");
// Definerer funkjson som kan bli brukt i ander filer.
async function createConnection() {
	// brukernavn, passord, og database navn for å hente ut data
	return (connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Kappa123",
		database: "cars",
	}));
}

module.exports = { createConnection };
