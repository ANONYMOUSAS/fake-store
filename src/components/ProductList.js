import React, { useEffect, useState } from 'react';
import { Row, Col, Drawer, List, InputNumber, Button } from 'antd';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    // Fetch products from the API and set them in the state
    // Replace this with your API fetch logic.
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If it's in the cart, update the quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show the cart drawer when an item is added
    setDrawerVisible(true);

    console.log(`Added to cart: ${product.title}`);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleQuantityChange = (cartItem, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleDeleteFromCart = (cartItem) => {
    // Filter out the item to be deleted
    const updatedCart = cart.filter((item) => item.id !== cartItem.id);
    setCart(updatedCart);
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <Row gutter={16}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
      <Drawer
        title="Shopping Cart"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(cartItem) => (
            <List.Item>
              <List.Item.Meta
                title={cartItem.title}
                description={`Price: $${cartItem.price} | Quantity: `}
              />
              <InputNumber
                min={1}
                value={cartItem.quantity}
                onChange={(value) => handleQuantityChange(cartItem, value)}
              />
              <Button type="danger" onClick={() => handleDeleteFromCart(cartItem)}>
                Delete
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default ProductList;
