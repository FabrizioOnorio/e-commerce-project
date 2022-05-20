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

const createAddToChart = async (userAndProduct) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = await client.db("e-commerce-project");
	const collection = await database.collection("shopping-charts");
	const searchForUser = await collection.findOne({
		userId: userAndProduct.userId,
	});
	if (searchForUser === null) {
		const documentToCreate = {
			userId: userAndProduct.userId,
			products: [userAndProduct.product],
			quantity: 1,
			price: userAndProduct.product.price,
		};
		const result = await collection.insertOne(documentToCreate);
		await client.close();
		return result;
	}
  
};

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.createAddToChart = createAddToChart;
