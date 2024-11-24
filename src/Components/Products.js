import React, { useState, useEffect } from "react";
import Product from "../Components/Product";

const Products = () => {
	const [products, setProducts] = useState([]);
	// const { name} = useContext(CartContext);
	useEffect(() => {
		fetch("http://18.117.89.140:3300/api/productList")
			.then((response) => response.json())
			.then((prod) => {
				// products.data.list = array
				setProducts(prod.data.list);
			});
	}, []);

	return (
		<div className="container mx-auto pb-24 pl-4 lg:pl-16 md:pl-8 sm:pl-4">
			<h1 className="text-lg font-bold my-8">Products</h1>
			<div className="grid grid-cols-1 my-8 gap-24 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
				{products.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Products;
