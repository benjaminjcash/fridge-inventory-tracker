import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ProductDetail from './ProductDetail';
import { fetchAllProducts } from '../../actions/product';
import { clearData } from '../../actions/data';

const ProductList = ({ products, data, fetchAllProducts, clearData }) => {
  const [css, theme] = useStyletron();
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if(data.success) {
      if(data.action == 'update') alert('Sucessfully updated the Product');
      clearData();
      fetchAllProducts();
      setSelectedProduct({});
    }
  }, [data]);

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

const ConnectedProductList = connect(
  (state) => {
    return {
      data: state.data
    }
  }, {
    fetchAllProducts,
    clearData
  }
)(ProductList);

export default ConnectedProductList;