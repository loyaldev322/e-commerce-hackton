import React, { useContext, useEffect, useState } from "react";
// import CartItem from "../Components/CartItem";
import { CartContext } from "../CartContext";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import emptyCart from "./images/empty-cart.png";

const Cart = () => {
	let total = 0;
	const [cartProducts, setCartProducts] = useState([]);
	const { cart, setCart } = useContext(CartContext);
	const [priceFetched, togglePriceFetched] = useState(false);
	const getQty = (productId) => {
		return cart.items[productId];
	};
	const increaseQty = (productId) => {
		const existingQty = cart.items[productId];
		const _cart = { ...cart };
		_cart.items[productId] = existingQty + 1;
		_cart.totalItems += 1;
		setCart(_cart);
	};

	const decreaseQty = (productId) => {
		const existingQty = cart.items[productId];
		if (existingQty === 1) {
			return;
		}
		const _cart = { ...cart };
		_cart.items[productId] = existingQty - 1;
		_cart.totalItems -= 1;
		setCart(_cart);
	};
	const getSum = (productId, price) => {
		const sum = price * getQty(productId);
		total += sum;
		return sum;
	};
	const handleDelete = (productId) => {
		setCartProducts(
			cartProducts.filter((product) => product._id !== productId),
		);
		const _cart = { ...cart };
		const qty = _cart.items[productId];
		delete _cart.items[productId];
		_cart.totalItems -= qty;
		setCart(_cart);
	};
	const makePayment = (token) => {
		const headers = {
			"Content-Type": "application/json",
		};
		const body = {
			token,
			cartProducts,
			totalPrice: total,
		};
		axios({
			method: "POST",
			url: "http://18.117.89.140:3300/api/payment",
			// url: "http://192.168.145.194:3300/api/payment",
			headers,
			data: body,
		})
			.then((response) => {
				const { status } = response;
				if (status === 200) {
					alert("Payment Successs");
					emptyCartAndState();
				} else {
					alert("Something Went Wrong!");
				}
			})
			.catch((error) => {
				alert("Something Went Wrong!");
			});
	};
	const emptyCartAndState = () => {
		setCartProducts([]);
		setCart([]);
	};
	useEffect(() => {
		if (!cart || !cart.items) {
			return;
		}
		if (priceFetched) {
			return;
		}
		fetch(`http://18.117.89.140:3300/api/products/cart-items`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				ids: Object.keys(cart.items),
			}),
		})
			.then((response) => response.json())
			.then((products) => {
				setCartProducts(products.data.list);
				togglePriceFetched(true);
			});
	}, [cart, priceFetched]);
	return !cartProducts.length ? (
		<img className="mx-auto w-1/2 mt-12" src={emptyCart} alt="Empty Cart" />
	) : (
		<div className="container mx-auto lg:w-1/2 w-full pb-24">
			<h1 className="my-12 font-bold">Cart Items</h1>
			<ul>
				{cartProducts.map((cartProduct) => {
					return (
						<li className="mb-12" key={cartProduct._id}>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										className="h-16"
										src={cartProduct.images[0]}
										alt="product"
									/>
									<span className="font-bold ml-4 w-48">
										{cartProduct.name}
									</span>
								</div>
								<div>
									<button
										className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none"
										onClick={() =>
											decreaseQty(cartProduct._id)
										}>
										-
									</button>
									<b className="px-4">
										{getQty(cartProduct._id)}
									</b>
									<button
										className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none"
										onClick={() =>
											increaseQty(cartProduct._id)
										}>
										+
									</button>
								</div>
								<span>
									${" "}
									{getSum(cartProduct._id, cartProduct.price)}
								</span>
								<button
									onClick={() =>
										handleDelete(cartProduct._id)
									}
									className="bg-red-500 px-4 py-2 rounded-full leading-none text-white focus:outline-none">
									Delete
								</button>
							</div>
						</li>
					);
				})}
				{/* // <img className="mx-auto w-1/2 mt-12" src="../images/empty-cart.png" alt="Empty Cart" /> */}
			</ul>
			<hr className="my-6" />
			<div className="text-right">
				<b>Grand Total :</b> $ {total}
			</div>
			<div className="text-right mt-6">
				<StripeCheckout
					stripeKey={`pk_test_nutR0mXwmJvpwIckqAxp463q00KEHEbltr`}
					token={makePayment}
					name={`Purchase of Products from HarryStore`}
					price={total * 100}>
					<button className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none">
						Order Now
					</button>
				</StripeCheckout>
			</div>
		</div>
	);
};

export default Cart;
