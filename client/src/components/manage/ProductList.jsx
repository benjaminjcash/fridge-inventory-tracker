import React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const ProductList = ({ products }) => {
  const [css, theme] = useStyletron();

  return (
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
        {row => (
          <img src={row.image_url} className={css({ width: '100%', maxWidth: '400px', height: 'auto%' })} />
        )}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

export default ProductList;