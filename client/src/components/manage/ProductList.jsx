import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ProductDetail from './ProductDetail';

const ProductList = ({ products }) => {
  const [css, theme] = useStyletron();
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    Object.keys(selectedProduct).length === 0 ?
      <TableBuilder data={products}>
        <TableBuilderColumn header="Name">
          {row => (
            <p>{row.name}</p>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Type">
          {row => (
            <p>{row.type}</p>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Image">
          {(row, i) => (
            <img 
              src={row.image_url} 
              className={css({ width: '100%', maxWidth: '400px', height: 'auto%' })} 
              onClick={() => setSelectedProduct(products[i])}
            />
          )}
        </TableBuilderColumn>
      </TableBuilder>
    :
      <ProductDetail product={selectedProduct} />
  );
}

export default ProductList;