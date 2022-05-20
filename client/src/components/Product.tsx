import React from "react";

interface ProductInterface {
	name: string;
	description: string;
	quantity: string;
	price: string;
	picture: string;
	id: string;
}

interface ProductPropsInterface {
	product: ProductInterface;
	userId: string;
}

const Product = ({ product, userId }: ProductPropsInterface) => {
	const handleSubmit = () => {
		const productToAdd = { userId, product };

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(productToAdd),
			headers: { "content-type": "application/json" },
		};
		const address =
			process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";
		try {
			fetch(`${address}/api/chart`, requestOptions).then((response) =>
				response.json()
			);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<article className="productCard">
			<img src={product.picture} alt="product displayed" />
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<p>
				quantity: {product.quantity ? product.quantity : "-"} - price:{" "}
				{product.price ? product.price : "-"} $
			</p>
			<button onClick={handleSubmit} className="submitButton">
				add to chart
			</button>
		</article>
	);
};

export default Product;
