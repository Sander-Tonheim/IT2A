const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const { createConnection } = require("./database/database.js");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
	res.render("index", { title: "index side", message: "hei", heading: "velkommen" });
});

const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
