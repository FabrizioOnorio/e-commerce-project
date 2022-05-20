import React, { useState, useEffect } from "react";
import Product from "./Product";

interface ProductInterface {
	name: string;
	description: string;
	quantity: string;
	price: string;
	picture: string;
	id: string;
}

interface ProductsInterface {
	userId: string;
}

const Products = ({ userId }: ProductsInterface) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const address =
			process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";
		fetch(`${address}/api/products`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => console.log(error.message));
	}, []);

	return (
		<div className="products">
			<h1 className="products--title">Products</h1>
			<ul className="products--list">
				{products.map((product: ProductInterface, index: number) => {
					return <Product key={index} product={product} userId={userId} />;
				})}
			</ul>
		</div>
	);
};

export default Products;
