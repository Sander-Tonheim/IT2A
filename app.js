const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
	res.render("index", { title: "index side", message: "hei", heading: "velkommen" });
});

const port = 3000;
app.listen(port, () => {
	console.log(`Denne serveren kjører på port ${port}`);
});
