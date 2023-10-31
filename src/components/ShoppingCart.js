import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../components/actions';

function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    // Dispatch an action to remove the product from the cart
    dispatch(removeFromCart(product));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <div>
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleRemoveFromCart(product)}>
                  Remove from Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
