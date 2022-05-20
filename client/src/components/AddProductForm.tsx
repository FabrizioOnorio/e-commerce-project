import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddProductFromPropsInterface {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
}

const AddProductForm = ({
	setLoading,
	loading,
}: AddProductFromPropsInterface) => {
	const [nameInput, setNameInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");
	const [quantityInput, setQuantityInput] = useState("");
	const [priceInput, setPriceInput] = useState("");
	const [image, setImage] = useState(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [picture, setPicture] = useState("");

	const uploadImage = async (e: React.FormEvent) => {
		const files = (e.target as HTMLInputElement).files;
		const data = new FormData();
		if (files !== null) {
			data.append("file", files[0]);
			data.append("upload_preset", "e-commerce-project");
			setLoading(true);
			const res = await fetch(
				"https://api.cloudinary.com/v1_1/dczox0nsa/image/upload",
				{
					method: "POST",
					body: data,
				}
			);
			const file = await res.json();
			setLoading(false);
			setImage(file.url);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const newProduct = {
			name: nameInput,
			description: descriptionInput,
			quantity: quantityInput,
			price: priceInput,
			picture: image,
      id: uuidv4(),
		};
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(newProduct),
			headers: { "content-type": "application/json" },
		};
		const address =
			process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";
		fetch(`${address}/api/products`, requestOptions).then((response) =>
			response.json()
		);
		setNameInput("");
		setDescriptionInput("");
		setQuantityInput("");
		setPriceInput("");
		setPicture("");
	};

	return (
		<form onSubmit={handleSubmit} className="addProductsForm">
			<input
				className="inputForm"
				type="text"
				name="name"
				value={nameInput}
				onChange={(e) => setNameInput(e.target.value)}
				placeholder="Product Name:"
				required
			/>
			<input
				className="inputForm"
				type="text"
				name="description"
				value={descriptionInput}
				onChange={(e) => setDescriptionInput(e.target.value)}
				placeholder="Product Description:"
			/>
			<input
				className="inputForm"
				type="text"
				name="quantity"
				value={quantityInput}
				onChange={(e) => setQuantityInput(e.target.value)}
				placeholder="Quantity:"
				required
			/>
			<input
				className="inputForm"
				type="text"
				name="price"
				value={priceInput}
				onChange={(e) => setPriceInput(e.target.value)}
				placeholder="Price:"
				required
			/>
			<input
				type="file"
				name="file"
				placeholder="upload image"
				onChange={uploadImage}
			/>
			<h3 className={loading ? "loading--display" : "loading--display--off"}>
				Picture Loading
			</h3>
			<input
				className="submitButton"
				type="submit"
				value="Submit"
				disabled={loading ? true : false}
			/>
		</form>
	);
};

export default AddProductForm;
