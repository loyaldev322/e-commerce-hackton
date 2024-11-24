import React from "react";
import Products from "../Components/Products";
import logoHero from "./images/home-hero.png";
const Home = () => {
	return (
		<>
			<div className="hero py-16">
				<div className="container mx-auto flex items-center justify-between">
					<div className="w-1/2" style={{ paddingLeft: "10%" }}>
						<h6 className="text-lg">
							<em>Ab Har Wish Hogi Poori</em>
						</h6>
						<h1 className="text-3xl md:text-6xl items-center font-bold">
							Shop With Us
						</h1>
						<button className="px-6 py-2 rounded-full text-white font-bold bg-yellow-500 mt-4 hover:bg-yellow-600">
							Order Now
						</button>
					</div>
					<div className="w-1/2" style={{ paddingLeft: "10%" }}>
						<img
							className="hidden md:block sm:block"
							src={logoHero}
							alt="logo-hero"
							style={{ height: "500px" }}
						/>
					</div>
				</div>
			</div>
			<div className="pb-24">
				<Products />
			</div>
		</>
	);
};

export default Home;
