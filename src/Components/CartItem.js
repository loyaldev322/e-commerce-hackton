import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const CartItem = ({ product }) => {
    const { cart, setCart } = useContext(CartContext);
    const getQty = (productId) =>{
        return cart.items[productId]
    }
    const increaseQty = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = {...cart}
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const decreaseQty = (productId) => {
        const existingQty = cart.items[productId];
        if(existingQty === 1) {
            return;
        }
        const _cart = {...cart}
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }
    const getSum = (productId, price) => {
        return (price * getQty(productId));
    }
    return (
        <li className="mb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img className="h-16" src={product.images[0]} alt="product" />
                    <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                    <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none" onClick={() => decreaseQty(product._id)}>-</button>
                    <b className="px-4">{getQty(product._id)}</b>
                    <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none" onClick={() => increaseQty(product._id)}>+</button>
                </div>
                <span>$ { getSum(product._id, product.price)}</span>
                <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white focus:outline-none">Delete</button>
            </div>
        </li>
    )
}

export default CartItem;
