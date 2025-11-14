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

// Definerer hva som skal skje når vi får inn en forespørsel (req) med GET motode i http header
app.get("/", async (req, res) => {
	// åpner en ny mysql tilkobling
	const connection = await createConnection();
	// henter data fra databasen.
	const results = await getCar(connection);
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("index", { cars: results });
});

// Definerer hva som skal skje når vi får inn en forespørsel (req) med GET motode i http header
app.get("/about", (req, res) => {
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("about");
});

// Definerer hva som skal skje når vi får inn en forespørsel (req) med GET motode i http header
app.get("/brukere", (req, res) => {
	console.log(req.query);
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	// sender ned et objekt med informasjon som vi kan bruke i malen.
	res.render("users", { names: ["per", "Ole", "Olesya", "Ådne", "Christian"] });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
