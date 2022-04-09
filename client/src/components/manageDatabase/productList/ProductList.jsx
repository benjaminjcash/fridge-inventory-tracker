import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ProductDetail from './ProductDetail';
import { fetchAllProducts } from '../../../actions/product';
import { clearData } from '../../../actions/data';
import { UPDATED_PRODUCT, DELETED_PRODUCT } from '../../../utils/constants';
import { PURPLE } from '../../../styles/colors';

const ProductList = ({ products, data, fetchAllProducts, clearData }) => {
  const [css, theme] = useStyletron();
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if(data.success) {
      if(data.action == UPDATED_PRODUCT) alert('Sucessfully updated Product');
      if(data.action == DELETED_PRODUCT) alert('Sucessfully deleted Product');
      clearData();
      fetchAllProducts();
      setSelectedProduct({});
    }
  }, [data]);

  return (
    Object.keys(selectedProduct).length === 0 ?
      <TableBuilder 
        data={products}
        overrides={{
          Root: {
            style: () => ({
              width: '100%'
            })
          },
          TableHeadCell: {
            style: () => ({
              color: theme[PURPLE]
            })
          }
        }}
      >
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
              className={css({ maxWidth: '75px', float: 'right', height: 'auto%' })} 
              onClick={() => {
                setSelectedProduct(products[i])
              }}
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