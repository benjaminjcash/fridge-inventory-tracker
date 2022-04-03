import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ButtonGroup, MODE } from "baseui/button-group";
import { Button } from "baseui/button";
import { useStyletron } from 'baseui';
import { clearData } from '../../actions/data';
import { fetchAllProducts, clearUPC, clearProduct } from '../../actions/product';
import AddItem from './addData/AddItem';
import ProductList from './productList/ProductList';
import DeleteItems from './deleteItems/DeleteItems';
import { clearSelectedItems, fetchAllItems } from '../../actions/item';

const Manage = ({ fetchAllProducts, products, clearData, clearUPC, clearProduct, clearSelectedItems, fetchAllItems }) => {
  const [css, theme] = useStyletron();
  const [selected, setSelected] = React.useState(0);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

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
            clearData();
            clearProduct();
            setSelected(index);
            clearSelectedItems();
            fetchAllItems(null, 'build_list');
          }}
        >
          <Button>Scan Item</Button>
          <Button>Delete Items</Button>
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
          <DeleteItems />
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
      upcData: state.upc,
      products: state.products
    }
  }, {
    clearData,
    fetchAllProducts,
    clearUPC,
    clearProduct,
    clearSelectedItems,
    fetchAllItems
  }
)(Manage);

export default ConnectedManage;