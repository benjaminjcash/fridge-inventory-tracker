import React, { useEffect, useState } from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import Item from '../fridge/Item';
import DeleteItem from '../manageInventory/deleteItems/Item';

const ItemList = ({ items, isDeleteItem }) => {
  const [css, theme] = useStyletron();
  const [columnCount, setColumnCount] = useState(1);
  const itemStyles = {
    backgroundColor: 'mono400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto'
  };

  useEffect(() => {
    const { innerWidth } = window;
    setColumnCount(innerWidth <= 400 ? 3 : 6);
  }, [])

  return (
    <FlexGrid
      flexGridColumnCount={columnCount}
      flexGridColumnGap={theme.sizing.scale300}
      flexGridRowGap={theme.sizing.scale400}
      width='100%'
      height='100%'
      justifyContent='center'
    >
      {
        items.length > 0 ?
          items.map((item) => {
            return (
              <FlexGridItem key={item._id} style={itemStyles}>
                { isDeleteItem ? <DeleteItem key={item._id} item={item}/> : <Item key={item._id} item={item}/> }
              </FlexGridItem>
            );
          })
        : <></>
      }
    </FlexGrid>
  )
}

export default ItemList;