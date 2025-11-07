// importerer pakker.
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

// Definerer hvilken port som skal være åpen for å motta forespørsler (req) fra klient.
const port = 3000;
// importerer funkjson som lager kobling til databasen.
const { createConnection } = require("./database/database");

// importerer funkjson som henter data fra databasen.
const { getCar } = require("./database/services");

// konfigurerer EJS som malmotor.
app.set("view engine", "ejs");

// serverer statiske filer.
app.use(express.static("public"));

// forteller hvor landingssiden er
app.get("/", async (req, res) => {
	// åpner en ny mysql tilkobling
	const connection = await createConnection();
	// henter data fra databasen.
	const results = await getCar(connection);
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("index", { cars: results });
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/bruker", (req, res) => {
	console.log(req.query);
	res.render("bruker", { names: ["per", "Ole", "Olesya", "Ådne"], fact: true, req: req.query });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
