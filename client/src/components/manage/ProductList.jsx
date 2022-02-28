import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { StyledSpinnerNext } from 'baseui/spinner';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { fetchAllProducts } from '../../actions/product';

const ProductList = ({ products, fetchAllProducts }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [css, theme] = useStyletron();

  useState(() => {
    if(!products.length > 0) {
      fetchAllProducts();
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setData(products);
    }
  }, [products]);

  return (
    isLoading ?
      <StyledSpinnerNext />
    :
    <TableBuilder data={data}>
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
        {row => (
          <img src={row.image_url} className={css({ width: '100%', maxWidth: '400px', height: 'auto%' })} />
        )}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

const ConnectedProductList = connect(state => {
  return {
    products: state.products
  };
}, {
  fetchAllProducts
})(ProductList);

export default ConnectedProductList;