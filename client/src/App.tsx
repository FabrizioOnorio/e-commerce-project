import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Products from "./components/Products";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import AddProducts from "./components/AddProducts";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);
export interface IApplicationProps {}
function App() {
	const [userId, setUserId] = useState(() => {
		if (window.localStorage.state) {
			const saved: string = localStorage.getItem("state") || "";
			const initialValue = JSON.parse(saved);
			return initialValue;
		}
		return "";
	});
	localStorage.setItem("state", JSON.stringify(userId));

	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route
					path="/"
					element={
						<AuthRoute>
							<Home />
						</AuthRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<AuthRoute>
							<Login setUserId={setUserId} />
						</AuthRoute>
					}
				/>
				<Route
					path="/about"
					element={
						<AuthRoute>
							<About />
						</AuthRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<AuthRoute>
							<Products userId={userId} />
						</AuthRoute>
					}
				/>
				<Route
					path="/addProducts"
					element={
						<AuthRoute>
							<AddProducts />
						</AuthRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
