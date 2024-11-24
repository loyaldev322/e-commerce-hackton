import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import appLogo from "./images/ecom.png";
import cartImage from "./images/cart.png";

const Navigation = () => {
	const cartStyle = {
		background: "#fbbd18",
		display: "flex",
		padding: "6px 12px",
		borderRadius: "50px",
	};
	const { cart } = useContext(CartContext);
	return (
		<>
			<nav className="container mx-auto flex items-center justify-between py-2">
				<Link to="/">
					<img style={{ height: "45px" }} src={appLogo} alt="logo" />
				</Link>
				<ul className="flex items-center">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li className="ml-6">
						<Link to="/products">Products</Link>
					</li>
					<li className="ml-6">
						<Link to="/cart">
							<div style={cartStyle}>
								<span>
									{cart
										? cart.totalItems
											? cart.totalItems
											: 0
										: 0}
								</span>
								<img
									className="ml-1"
									src={cartImage}
									alt="cart"
									style={{ height: "30px" }}
								/>
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Navigation;
