const express = require("express");
const app = express();

app.get("/", async (req, res) => {
	res.status(303).send("Noe gikk gale");
});

const port = 3000;
app.listen(port, () => {
	console.log(`Denne serveren kjører på port ${port}`);
});
