import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ButtonGroup, MODE } from "baseui/button-group";
import { Button } from "baseui/button";
import { useStyletron } from 'baseui';
import { updateItem, deleteItem, fetchAllItems } from '../../actions/item';
import { clearData } from '../../actions/data';
import { fetchAllProducts, clearUPC } from '../../actions/product';
import AddItem from './AddItem';
import ProductList from './ProductList';
import DeleteItem from './DeleteItem';

const Manage = ({ data, items, deleteItem, fetchAllProducts, products, clearData, clearUPC }) => {
  const [css, theme] = useStyletron();
  const [selected, setSelected] = React.useState(0);
  const [clearDeleteItem, setClearDeleteItem] = React.useState(false);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doDeleteItem = (item) => {
    setClearDeleteItem(false);
    deleteItem(item);
  }

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  React.useEffect(() => {
    if(data.success & data.action === 'delete') {
      setClearDeleteItem(true);
      clearData();
      alert('Successfully removed item from your Fridge.')
      location.reload();
    }
  }, [data]);

  return (
    <> 
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%', marginTop: theme.sizing.scale300 })}
    >
      <FlexGridItem className={css({ height: 'auto', backgroundColor: '#141414' })}>
        <ButtonGroup
          mode={MODE.radio}
          selected={selected}
          onClick={(event, index) => {
            clearUPC();
            setSelected(index);
          }}
        >
          <Button>Scan Item</Button>
          <Button>Delete Item</Button>
          <Button>View Products</Button>
        </ButtonGroup>
      </FlexGridItem>
      { selected === 0 && 
        <FlexGridItem {...itemProps}>
          <AddItem />
        </FlexGridItem>
      }
      { selected === 1 && 
        <FlexGridItem {...itemProps}>
          <DeleteItem doDeleteItem={doDeleteItem} items={items} clearDeleteItem={clearDeleteItem} />
        </FlexGridItem>
      }
      { selected === 2 && 
        <FlexGridItem {...itemProps}>
          <ProductList products={products} />
        </FlexGridItem>
      }
    </FlexGrid>
    </>
  );
}

const ConnectedManage = connect(
  (state) => {
    return {
      data: state.data,
      items: state.items,
      upcData: state.upc,
      products: state.products
    }
  }, {
    fetchAllItems,
    updateItem,
    deleteItem,
    clearData,
    fetchAllProducts,
    clearUPC
  }
)(Manage);

export default ConnectedManage;