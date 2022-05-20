const express = require("express");
const db = require("./mongodb");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3030;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => console.log(`Hey I'm here listening on ${port}!`));

app.get("/api/products", async (req, res) => {
	try {
		const results = await db.getProducts();
		res.send(results);
	} catch (err) {
		console.log(err, "error from get all");
	}
});

app.post("/api/products", async (req, res) => {
	try {
		const product = await req.body;
		const results = await db.addProduct(product);
		res.json(results);
	} catch (err) {
		console.log("error message is: ", err.message);
	}
});

app.post("/api/chart", async (req, res) => {
	try {
		const userAndProductToAdd = await req.body;
		console.log(userAndProductToAdd);
		const results = await db.createAddToChart(userAndProductToAdd);
		res.json(results);
	} catch (err) {
		console.log("error message is: ", err.message);
	}
});

app.use((req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports.app = app;
