import React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const UPCProductList = ({ products, onProductSelect }) => {
  const [css, theme] = useStyletron();
  return (
    <TableBuilder style={{ marginTop: '8px' }} data={products}>
      <TableBuilderColumn header="Title">
        {(row, i) => {
          return <p onClick={() => onProductSelect(i)}>{row.title}</p>
        }}
      </TableBuilderColumn>
      <TableBuilderColumn header="Image">
        {(row, i) => {
          if(row.images.length > 0) {
            const image_url = row.images[0];
            return  <img src={image_url} onClick={() => onProductSelect(i)} className={css({ width: '100%', maxWidth: '400px', height: 'auto%' })} />
          } else {
            <p onClick={() => onProductSelect(i)}>No Image</p>
          }
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

export default UPCProductList;