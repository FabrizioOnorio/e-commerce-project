const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.URL;

const getProducts = async () => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("e-commerce-project");
	const collection = database.collection("products");

	const result = await collection.find().toArray();
	await client.close();
	return result;
};

const addProduct = async (product) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("e-commerce-project");
	const collection = database.collection("products");

	const result = await collection.insertOne(product);
	await client.close();
	return result;
};

const createAddToChart = (product) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
  const database = client.db("e-commerce-project");
  const collection = database.collection("shopping-charts");
  const result = await collection.insertOne(product);
}

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
