import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

const Product = ({ product }) => {
	const boxStyle = {
		boxShadow: "20px 20px 50px rgb(0, 0, 0, 0.1)",
		border: "2px solid",
		borderRadius: "20px",
		padding: "15%",
		borderColor: "white",
	};

	const [isAdding, setIsAdding] = useState(false);
	const { cart, setCart } = useContext(CartContext);

	const addToCart = (event, product) => {
		event.preventDefault();
		// CART should looks like this
		// const cart = {
		//     items: {
		//         "product_id": qty
		//     },
		//     totalItems: totalQty
		// }
		let _cart = { ...cart };
		// check is items property already exists if not?
		if (!_cart.items) {
			_cart.items = {};
		}

		// check if product already exists in cart then increase quantity
		if (_cart.items[product._id]) {
			_cart.items[product._id] += 1;
		} else {
			// if product is adding first time in cart then set it's qty to 1
			_cart.items[product._id] = 1;
		}
		// check if totalItems key exists or not
		// to prevent undefined and NaN
		if (!_cart.totalItems) {
			_cart.totalItems = 0;
		}
		// update qty of totalItem by 1
		_cart.totalItems += 1;
		setCart(_cart);
		setIsAdding(true);

		setTimeout(() => {
			setIsAdding(false);
		}, 1000);
	};

	return (
		<Link to={`products/${product._id}`}>
			<div style={boxStyle}>
				<img src={product?.images[0]} alt="test" />
				<div className="text-center">
					<h2 className="text-lg font-bold py-2">{product.name}</h2>
					<span className="bg-gray-200 py-1 rounded-full text-sm px-4">
						{product.country}
					</span>
				</div>
				<div className="flex justify-between items-center mt-4">
					<span>
						{" "}
						{/* ₹ */}$ {product.price}
					</span>
					<button
						disabled={isAdding}
						className={`${
							isAdding
								? "py-1 px-4 rounded-full font-bold bg-green-300 focus:outline-none"
								: "py-1 px-4 rounded-full font-bold bg-yellow-400 focus:outline-none"
						}`}
						onClick={(e) => addToCart(e, product)}>
						Add{isAdding ? "ed" : ""}
					</button>
				</div>
			</div>
		</Link>
	);
};

export default Product;
