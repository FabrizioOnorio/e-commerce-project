import React, { useState } from "react";
import AddProductForm from "./AddProductForm";

const AddProducts = () => {
	const [loading, setLoading] = useState(false);
	return (
		<div className="addProducts">
			<h1 className="addProducts--title">Add your product here:</h1>
			<AddProductForm setLoading={setLoading} loading={loading} />
		</div>
	);
};

export default AddProducts;
