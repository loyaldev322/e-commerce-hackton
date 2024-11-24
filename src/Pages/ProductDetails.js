import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CartContext } from "../CartContext";
const ProductDetails = () => {
	const [product, setProduct] = useState({});
	const params = useParams();
	const history = useHistory();
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
	useEffect(() => {
		fetch(`http://18.117.89.140:3300/api/product/${params._id}`)
			.then((response) => response.json())
			.then((_product) => {
				setProduct(_product.data);
			})
			.catch((error) => {
				alert("Something Went Wrong!!!");
			});
	}, [params._id]);
	return (
		<div className="conatiner mx-auto mt-12 pl-16">
			<button
				className="mb-12 font-bold focus:outline-none"
				onClick={() => history.goBack()}>
				Back
			</button>
			<div className="flex">
				<img src={product.images} height="100px" alt="productImage" />
				<div>
					<h1 className="text-xl font-bold">{product.name}</h1>
					{/* <div className="bg-gray-200 w-24 p-1 rounded-full px-4 text-md">Country</div> */}
					<div className="font-bold mt-2">$ {product.price}</div>
					<div className="mt-2">
						<em>{product.stock} quantity left</em>
					</div>
					<div className="mt-2">{product.description}</div>
					{/* <button className="py-1 px-4 rounded-full font-bold bg-yellow-400 mt-4">Add to cart</button> */}
					<button
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
		</div>
	);
};

export default ProductDetails;
