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
}

const Product = ({ product }: ProductPropsInterface) => {
	const handleSubmit = () => {
    		// const requestOptions = {
				// 	method: "POST",
				// 	body: JSON.stringify(newProduct),
				// 	headers: { "content-type": "application/json" },
				// };
				// const address =
				// 	process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";
				// fetch(`${address}/api/products`, requestOptions).then((response) =>
				// 	response.json()
				// );
    console.log(product.id)
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
