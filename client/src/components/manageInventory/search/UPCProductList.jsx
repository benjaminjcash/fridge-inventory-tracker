import React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import UPCProductImage from './UPCProductImage';
import { YELLOW } from '../../../styles/colors';

const UPCProductList = ({ products, onProductSelect }) => {
  const [css, theme] = useStyletron();
  return (
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
            color: theme[YELLOW]
          })
        }
      }}
    >
      <TableBuilderColumn header="Title">
        {(row) => {
          return <p>{row.title}</p>
        }}
      </TableBuilderColumn>
      <TableBuilderColumn header="Image">
        {(row, i) => {
          if(row.images.length > 0) {
            const image_url = row.images[0];
            return <UPCProductImage src={image_url} onProductSelect={onProductSelect} index={i} />
          } else {
            <p onClick={() => onProductSelect(i)}>No Image</p>
          }
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

export default UPCProductList;