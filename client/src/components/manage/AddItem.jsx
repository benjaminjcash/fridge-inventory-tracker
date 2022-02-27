import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC, createProduct, searchProduct } from '../../actions/product';
import { clearData } from '../../actions/data';
import { createItem } from '../../actions/item';
import ScanItem from './ScanItem';
import CreateProduct from './CreateProduct';
import ManuallyAddItem from './ManuallyAddItem';
import Scanner from '../scanner/Scanner';
import { useStyletron } from 'baseui';

const AddItem = ({ upcData, searchProduct, searchUPC }) => {
  const [clearSearchUPC, setClearSearchUPC] = React.useState(false);
  const [clearAddItem, setClearAddItem] = React.useState(false);
  const [scannerIsOpen, setScannerIsOpen] = React.useState(false);
  const [clearCreateProduct, setClearCreateProduct] = React.useState(false);
  const [barcode, setBarcode] = React.useState('');
  const [css, theme] = useStyletron();

  useEffect(() => {
    if(barcode.length) {
      searchProduct(barcode);
    }
  }, [barcode]);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doSearchUPC = (barcode) => {
    setClearSearchUPC(false);
    searchUPC(barcode);
  }

  const doCreateItem = (item) => {
    setClearAddItem(false);
    createItem(item);
  }

  const doCreateProduct = (product) => {
    setClearCreateProduct(false);
    createProduct(product);
  }

  const closeScannerModal = () => {
    setScannerIsOpen(false);
  }

  return (
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      <FlexGridItem key={0} {...itemProps}>
        <ScanItem doSearchUPC={doSearchUPC} clearSearchUPC={clearSearchUPC} setScannerIsOpen={setScannerIsOpen} />
      </FlexGridItem>
      <FlexGridItem key={1} {...itemProps}>
        <CreateProduct doCreateProduct={doCreateProduct} clearCreateProduct={clearCreateProduct} upcData={upcData} />
      </FlexGridItem>
      <FlexGridItem key={2} {...itemProps}>
        <ManuallyAddItem doCreateItem={doCreateItem} clearAddItem={clearAddItem}/>
      </FlexGridItem>
      {scannerIsOpen && <Scanner key={3} isOpen={scannerIsOpen} close={closeScannerModal} setBarcode={setBarcode}/>}
    </FlexGrid>
  );
}

const ConnectedAddItem = connect(
  (state) => {
    return {
      upcData: state.upc
    }
  }, {
    createItem,
    clearData,
    searchUPC,
    createProduct,
    searchProduct
  }
)(AddItem);

export default ConnectedAddItem;