import React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ProduceImage from './ProduceImage';
import { PINK } from '../../../styles/colors';

const ProduceResultList = ({ produces, onProduceSelect }) => {
  const [css, theme] = useStyletron();
  return (
    <TableBuilder 
      data={produces} 
      overrides={{
        Root: {
          style: () => ({
            width: '100%'
          })
        },
        TableHeadCell: {
          style: () => ({
            color: theme[PINK]
          })
        }
      }}
    >
      <TableBuilderColumn header="Name">
        {(row) => {
          return <p>{row.name}</p>
        }}
      </TableBuilderColumn>
      <TableBuilderColumn header="Type">
        {(row) => {
          return <p>{row.type}</p>
        }}
      </TableBuilderColumn>
      <TableBuilderColumn header="Shelf Life">
        {(row) => {
          return <p>{row.shelf_life} days</p>
        }}
      </TableBuilderColumn>
      <TableBuilderColumn header="Image">
        {(row, i) => {
          if(row.image_url.length > 0) {
            return <ProduceImage src={row.image_url} onProduceSelect={onProduceSelect} index={i} />
          } else {
            return <p onClick={() => onProduceSelect(i)}>No Image</p>
          }
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
}

export default ProduceResultList;