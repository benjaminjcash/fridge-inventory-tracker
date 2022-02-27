import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ButtonGroup, SIZE, MODE } from "baseui/button-group";
import { Button } from "baseui/button";
import { useStyletron } from 'baseui';
import { updateItem, deleteItem, fetchAllItems } from '../../actions/item';
import { clearData } from '../../actions/data';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import ConfirmModal from '../shared/ConfirmModal';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../../utils/constants';

const Manage = ({ data, items, updateItem, deleteItem, fetchAllItems, clearData }) => {
  const [css, theme] = useStyletron();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [clearUpdateItem, setClearUpdateItem] = React.useState(false);
  const [clearDeleteItem, setClearDeleteItem] = React.useState(false);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doUpdateItem = (item) => {
    setClearUpdateItem(false);
    updateItem(item);
  }

  const doDeleteItem = (item) => {
    setClearDeleteItem(false);
    deleteItem(item);
  }

  const closeConfirmModal = () => {
    setClearAddItem(true);
    setClearDeleteItem(true);
    setClearUpdateItem(true);
    setClearCreateProduct(true);
    setClearSearchUPC(true);
    clearData();
    setConfirmModalIsOpen(false);
  }

  React.useEffect(() => {
    if(data.success) {
      setConfirmModalIsOpen(true);
    } else {
      fetchAllItems(DEFAULT_FETCH_ALL_ITEMS_OPTIONS, 'build_list');
    }
  }, [data])

  return (
    <> 
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%', marginTop: theme.sizing.scale300 })}
    >
      <FlexGridItem className={css({ height: 'auto', backgroundColor: '#141414' })}>
        <ButtonGroup 
          size={SIZE.mini} 
          mode={MODE.radio}
          selected={selected}
          onClick={(event, index) => {
            setSelected(index);
          }}
        >
          <Button>Scan Item</Button>
          <Button>Update Item</Button>
          <Button>Delete Item</Button>
        </ButtonGroup>
      </FlexGridItem>
      { selected === 0 && 
        <FlexGridItem {...itemProps}>
          <AddItem />
        </FlexGridItem>
      }
      { selected === 1 && 
        <FlexGridItem {...itemProps}>
          <UpdateItem doUpdateItem={doUpdateItem} items={items} clearUpdateItem={clearUpdateItem}/>
        </FlexGridItem>
      }
      { selected === 2 && 
        <FlexGridItem {...itemProps}>
          <DeleteItem doDeleteItem={doDeleteItem} items={items} clearDeleteItem={clearDeleteItem} />
        </FlexGridItem>
      }
    </FlexGrid>

    {confirmModalIsOpen && <ConfirmModal isOpen={confirmModalIsOpen} closeModal={closeConfirmModal} />}
    </>
  );
}

const ConnectedManage = connect(
  (state) => {
    return {
      data: state.data,
      items: state.items,
      upcData: state.upc
    }
  }, {
    fetchAllItems,
    updateItem,
    deleteItem,
    clearData,
  }
)(Manage);

export default ConnectedManage;