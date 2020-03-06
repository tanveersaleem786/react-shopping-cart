import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		if(cart.length !==0) {			
			const chk_item_in_cart = cart.filter(cartItem => cartItem.id === item.id);
			if(chk_item_in_cart.length === 0)
			setCart([...cart,item]);
		}
		else {
		  setCart([...cart,item]);
		}  
	};

	const removeItem  = item => {
		// remove the item form the cart	
		setCart(cart.filter(cartItem => cartItem.id !== item.id));		
	};

	return (
		
		<ProductContext.Provider
		  value={{
			   products: products, 
			   addItem: addItem			  
		  }}
		>
        
			<CartContext.Provider
			   value={{
				  cart: cart,
				  removeItem: removeItem
			   }}
			>
			
				<div className="App">
					<Navigation cart={cart} />

					{/* Routes */}
					<Route exact path="/">
						<Products  />
					</Route>

					<Route path="/cart">
						<ShoppingCart cart={cart} />
					</Route>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
