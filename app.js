const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const { createConnection } = require("./database/database");
const { getCar } = require("./database/services");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
	const connection = await createConnection();

	const results = await getCar(connection);

	res.render("index", { cars: results });
});

app.use(express.static("public"));

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
