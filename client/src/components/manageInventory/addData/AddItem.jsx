import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { useStyletron } from 'baseui';
import { lookupUPC, clearUPC, createProduct, searchProduct, clearProduct } from '../../../actions/product';
import { clearData } from '../../../actions/data';
import { createItem, fetchAllItems } from '../../../actions/item';
import ScanItem from '../addData/ScanItem';
import CreateProduct from './CreateProduct';
import CreateItem from '../addData/CreateItem';
import Scanner from '../../shared/Scanner';

const AddItem = ({ upcData, searchProduct, createProduct, lookupUPC, product, clearData, createItem, fetchAllItems }) => {
  const [css, theme] = useStyletron();

  const [scannerIsOpen, setScannerIsOpen] = React.useState(false);
  const [showCreateProduct, setShowCreateProduct] = React.useState(false);
  const [showScanItem, setShowScanItem] = React.useState(true);
  const [showCreateItem, setShowCreateItem] = React.useState(false);

  const [barcode, setBarcode] = React.useState('');
  const [barcodeInput, setBarcodeInput] = React.useState([]);

  useEffect(() => {
    if(barcode.length) {
      searchProduct(barcode);
    }
  }, [barcode]);

  useEffect(() => {
    if(Object.keys(product).length > 0) {
      setShowScanItem(false);
      setShowCreateItem(true);
    } else {
      if(barcode.length) {
        lookupUPC(barcode);
      } else if(barcodeInput.length) {
        lookupUPC(barcodeInput);
      }
    }
  }, [product]);

  useEffect(() => {
    if(Object.keys(upcData).length > 0) {
      setShowScanItem(false);
      setShowCreateProduct(true);
    } 
  }, [upcData])

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doSearch = () => {
    searchProduct(barcodeInput);
  }

  const doCreateItem = (item) => {
    createItem(item);
    alert('Successfully added item to your Fridge.');
    fetchAllItems(null, 'build_list');
    setShowCreateItem(false);
    setShowScanItem(true);
    resetState();
  }

  const doCreateProduct = (product) => {
    createProduct(product);
    alert("Successfully added product to the Database.");
    setShowCreateProduct(false);
    setShowCreateItem(true);
    resetState();
  }

  const closeScannerModal = () => {
    setScannerIsOpen(false);
  }

  const resetState = () => {
    clearData();
    setBarcode('');
    setBarcodeInput([]);
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      {
        showScanItem ?
          <FlexGridItem key={0} {...itemProps}>
            <ScanItem barcodeInput={barcodeInput} setBarcodeInput={setBarcodeInput} doSearch={doSearch} setScannerIsOpen={setScannerIsOpen} />
          </FlexGridItem>
        : showCreateProduct ?
          <FlexGridItem key={1} {...itemProps}>
            <CreateProduct doCreateProduct={doCreateProduct} upcData={upcData} />
          </FlexGridItem>
        : showCreateItem ?
        <FlexGridItem key={2} {...itemProps}>
          <CreateItem doCreateItem={doCreateItem} />
        </FlexGridItem>
        : <></>
      }
      { 
        scannerIsOpen && 
        <Scanner key={3} isOpen={scannerIsOpen} close={closeScannerModal} setBarcode={setBarcode}/>
      }
    </FlexGrid>
    </>
  );
}

const ConnectedAddItem = connect(
  (state) => {
    return {
      upcData: state.upc,
      product: state.product
    }
  }, {
    createItem,
    clearData,
    lookupUPC,
    clearUPC,
    createProduct,
    searchProduct,
    clearProduct,
    fetchAllItems
  }
)(AddItem);

export default ConnectedAddItem;