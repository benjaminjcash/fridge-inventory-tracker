import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ButtonGroup, MODE } from "baseui/button-group";
import { Button, SIZE } from "baseui/button";
import { useStyletron } from 'baseui';
import { clearData } from '../../actions/data';
import { clearUPC, clearProduct } from '../../actions/product';
import AddItem from './addData/AddItem';
import DeleteItems from './deleteItems/DeleteItems';
import SearchUPC from './search/SearchUPC';
import AddProduce from './addProduce/AddProduce';
import { clearSelectedItems, fetchAllItems } from '../../actions/item';
import { ORANGE, PINK, YELLOW, RED } from '../../styles/colors';

const ManageInventory = ({ clearData, clearUPC, clearProduct, clearSelectedItems, fetchAllItems }) => {
  const [css, theme] = useStyletron();
  const [selected, setSelected] = React.useState(0);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const colorsByIndex = [ORANGE, PINK, YELLOW, RED];
  const buildButtonStyles = (i) => {
    return selected == i ? { backgroundColor: colorsByIndex[i] } : {};
  }

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
            clearSelectedItems();
            setSelected(index);
            fetchAllItems(null, 'build_list');
          }}
          size={SIZE.compact}
        >
          <Button overrides={{ BaseButton: { style: ({ $theme }) => buildButtonStyles(0) }}}>Scan Item</Button>
          <Button overrides={{ BaseButton: { style: ({ $theme }) => buildButtonStyles(1) }}}>Add Produce</Button>
          <Button overrides={{ BaseButton: { style: ({ $theme }) => buildButtonStyles(2) }}}>Search Products</Button>
          <Button overrides={{ BaseButton: { style: ({ $theme }) => buildButtonStyles(3) }}}>Delete Items</Button>
        </ButtonGroup>
      </FlexGridItem>
      { selected === 0 && <FlexGridItem {...itemProps}><AddItem /></FlexGridItem>}
      { selected === 1 && <FlexGridItem {...itemProps}><AddProduce /></FlexGridItem>}
      { selected === 2 && <FlexGridItem {...itemProps} style={{ marginTop: '-8px' }}><SearchUPC /></FlexGridItem>}
      { selected === 3 && <FlexGridItem {...itemProps}><DeleteItems /></FlexGridItem>}
    </FlexGrid>
    </>
  );
}

const ConnectedManageInventory = connect(
  (state) => {
    return {
      upcData: state.upc
    }
  }, {
    clearData,
    clearUPC,
    clearProduct,
    clearSelectedItems,
    fetchAllItems
  }
)(ManageInventory);

export default ConnectedManageInventory;