// force push

// importerer pakker.
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");

const app = express();

// Definerer hvilken port som skal være åpen for å motta forespørsler (req) fra klient.
const port = 3000;
// importerer funkjson som lager kobling til databasen.
const { createConnection } = require("./database/database");
const { getUserData, insertIntoUserDatabase } = require("./database/services");
const { isAuthenticated } = require("./middleware/authMiddleware");

// konfigurerer EJS som malmotor.
app.set("view engine", "ejs");

// serverer statiske filer.
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, maxAge: 30000000000 },
	}),
);

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
	const hashedPassword = bcrypt.hashSync(input.password, saltRounds);

	await insertIntoUserDatabase(connection, input.email, hashedPassword);
	res.redirect("/registrer");
});

app.get("/innlogging", (req, res) => {
	res.render("signin");
});

app.post("/innlogging", async (req, res) => {
	const connection = await createConnection();
	const { email, password } = req.body;

	const dbUserInfo = await getUserData(connection, email);
	// sjekker "hvis ikke" passordet fra form stemmer med passordet i databasen, send bruker til /innlogging
	if (!bcrypt.compareSync(password, dbUserInfo[0].password)) {
		return res.redirect("/innlogging");
	}
	// legge data i session etter at bruker er logget inn
	req.session.email = email;
	req.session.userId = dbUserInfo[0].id;

	// sender bruker til dashboard siden dersom passordet stemmer
	return res.redirect("/dashboard");
});

app.get("/dashboard", isAuthenticated, async (req, res) => {
	// destruktur for key value pair i req.session
	const { userId, email } = req.session;
	// sender informasjon fra session til dashboard side
	res.render("dashboard", { id: userId, email: email });
});

app.get("/about", (req, res) => {
	// definerer hvordan vi skal svare på forsepørslen (req) fra klienten på denne ruten.
	res.render("about");
});

app.get("/logout", (req, res) => {
	// Kode for å slette sessoin når brukeren logger ut. Kjører callback funsjonen når den er ferdig med destroy metoden.
	req.session.destroy(() => {
		// Fjerner cookies i nettleseren med navn "connect.sid".
		res.clearCookie("connect.sid");
		// Sender brukeren til forsiden.
		res.redirect("/");
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
