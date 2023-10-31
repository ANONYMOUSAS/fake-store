import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../components/actions';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the product details for the specified ID and set them in the state
    // You should replace this with your API fetch logic.
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Dispatch an action to add the product to the cart
      dispatch(addToCart(product));
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <br />
          <Link to="/cart">View Cart</Link>
          <br />
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
