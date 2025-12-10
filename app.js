// force push

// importerer pakker.
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

const app = express();

// Definerer hvilken port som skal være åpen for å motta forespørsler (req) fra klient.
const port = 3000;
// importerer funkjson som lager kobling til databasen.
const { createConnection } = require("./database/database");
const { getUserData, insertIntoUserDatabase } = require("./database/services");

// konfigurerer EJS som malmotor.
app.set("view engine", "ejs");

// serverer statiske filer.
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// Definerer hva som skal skje når vi får inn en forespørsel (req) med GET motode i http header
app.get("/", async (req, res) => {
	// åpner en ny mysql tilkobling
	const connection = await createConnection();
	// henter data fra databasen.
	const results = await getUserData(connection);
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("index", { cars: results });
});

app.get("/registrer", (req, res) => {
	res.render("registrerUser");
});

app.post("/registrer", async (req, res) => {
	const connection = await createConnection();
	const input = req.body;
	await insertIntoUserDatabase(connection, input.first_name, input.last_name, input.email, input.password);
	res.redirect("/registrer");
});

app.get("/innlogging", (req, res) => {
	res.render("signin");
});

app.post("/innlogging", async (req, res) => {
	const connection = await createConnection();
	const userData = req.body;
	const dbUserInfo = await getUserData(connection, userData.email);
	if (userData.password === dbUserInfo[0].password) {
		return res.redirect("/dashboard");
	}
	res.redirect("/innlogging");
});
app.get("/dashboard", (req, res) => {
	res.render("dashboard");
});

app.get("/about", (req, res) => {
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("about");
});

// Definerer hva som skal skje når vi får inn en forespørsel (req) med GET motode i http header
app.get("/brukere", (req, res) => {
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	// sender ned et objekt med informasjon som vi kan bruke i malen.
	res.render("users", { names: ["per", "Ole", "Olesya", "Ådne", "Christian"] });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
