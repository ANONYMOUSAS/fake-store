import React from 'react';
import { Card, Button } from 'antd';

function ProductCard({ product, onAddToCart }) {
  const cardStyle = {
    border: '3px solid #e8e8e8',
    //height: '100%', // Set a fixed height for the card
    margin: '12px',
  };

  return (
    <Card
      hoverable
      style={cardStyle}
      cover={<img alt={product.title} src={product.image} />}
      actions={[
        <Button type="link" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      ]}
    >
      <Card.Meta
        title={product.title}
        description={`Price: $${product.price}`}
      />
    </Card>
  );
}

export default ProductCard;
