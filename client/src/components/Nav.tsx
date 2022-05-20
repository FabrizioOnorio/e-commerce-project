import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Nav = () => {
	const auth = getAuth();
	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			<Link to="/products">Products</Link>
			<Link to="/addProducts">Add Products</Link>
			<Link to="/about">About</Link>
			<button
				className="submitButton"
				onClick={() => {
					signOut(auth);
					localStorage.clear();
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default Nav;
