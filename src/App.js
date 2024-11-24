import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navigation from "./Components/Navigation";
import ProductsPage from "./Pages/ProductsPage";
import Cart from "./Pages/Cart";
import { CartContext } from "./CartContext.js";
import ProductDetails from "./Pages/ProductDetails";
const App = () => {
	const [cart, setCart] = useState({});
	// fetch from localstorage first
	useEffect(() => {
		const cart = window.localStorage.getItem("cart");
		setCart(JSON.parse(cart));
	}, []);

	useEffect(() => {
		window.localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);
	return (
		<>
			<CartContext.Provider value={{ cart, setCart }}>
				<Router>
					<Navigation />
					<Switch>
						<Route path="/" exact component={Home}></Route>
						<Route
							path="/products"
							exact
							component={ProductsPage}></Route>
						<Route
							path="/products/:_id"
							exact
							component={ProductDetails}></Route>
						<Route path="/cart" exact component={Cart}></Route>
					</Switch>
				</Router>
			</CartContext.Provider>
		</>
	);
};

export default App;
