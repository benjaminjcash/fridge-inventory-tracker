import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { useStyletron } from 'baseui';
import { createItem, updateItem, deleteItem, fetchAllItems } from '../actions/item';
import { searchUPC, createProduct } from '../actions/product';
import { clearData } from '../actions/data';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import ScanItem from './ScanItem';
import CreateProduct from './CreateProduct';
import ConfirmModal from './ConfirmModal';
import ScannerModal from './scanner/ScannerModal';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../utils/constants';

const Manage = ({ data, items, upcData, createItem, updateItem, deleteItem, fetchAllItems, clearData, searchUPC, createProduct }) => {
  const [css, theme] = useStyletron();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = React.useState(false);
  const [scannerModalIsOpen, setScannerModalIsOpen] = React.useState(false);
  const [clearAddItem, setClearAddItem] = React.useState(false);
  const [clearSearchUPC, setClearSearchUPC] = React.useState(false);
  const [clearUpdateItem, setClearUpdateItem] = React.useState(false);
  const [clearDeleteItem, setClearDeleteItem] = React.useState(false);
  const [clearCreateProduct, setClearCreateProduct] = React.useState(false);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doCreateItem = (item) => {
    setClearAddItem(false);
    createItem(item);
  }

  const doSearchUPC = (barcode) => {
    setClearSearchUPC(false);
    searchUPC(barcode);
  }

  const doUpdateItem = (item) => {
    setClearUpdateItem(false);
    updateItem(item);
  }

  const doDeleteItem = (item) => {
    setClearDeleteItem(false);
    deleteItem(item);
  }

  const doCreateProduct = (product) => {
    setClearCreateProduct(false);
    createProduct(product);
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

  const closeScannerModal = () => {
    setScannerModalIsOpen(false);
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
      <FlexGridItem {...itemProps}>
        <AddItem doCreateItem={doCreateItem} clearAddItem={clearAddItem}/>
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        <UpdateItem doUpdateItem={doUpdateItem} items={items} clearUpdateItem={clearUpdateItem}/>
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        <DeleteItem doDeleteItem={doDeleteItem} items={items} clearDeleteItem={clearDeleteItem} />
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        <ScanItem doSearchUPC={doSearchUPC} clearSearchUPC={clearSearchUPC} setScannerModalIsOpen={setScannerModalIsOpen} />
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        <CreateProduct doCreateProduct={doCreateProduct} clearCreateProduct={clearCreateProduct} upcData={upcData} />
      </FlexGridItem>
    </FlexGrid>

    {confirmModalIsOpen && <ConfirmModal isOpen={confirmModalIsOpen} closeModal={closeConfirmModal} />}
    {scannerModalIsOpen && <ScannerModal isOpen={scannerModalIsOpen} closeModal={closeScannerModal} />}
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
    createItem,
    updateItem,
    deleteItem,
    clearData,
    searchUPC,
    createProduct
  }
)(Manage);

export default ConnectedManage;