import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC, clearUPC, createProduct, searchProduct, clearProduct } from '../../actions/product';
import { clearData } from '../../actions/data';
import { createItem } from '../../actions/item';
import ScanItem from './ScanItem';
import CreateProductForm from './CreateProduct';
import ConfirmModal from '../shared/ConfirmModal';
import CreateItem from './CreateItem';
import Scanner from '../scanner/Scanner';
import { useStyletron } from 'baseui';

const AddItem = ({ upcData, searchProduct, createProduct, searchUPC, product, clearData, createItem }) => {
  const [clearSearchUPC, setClearSearchUPC] = React.useState(false);
  const [clearAddItem, setClearAddItem] = React.useState(false);
  const [scannerIsOpen, setScannerIsOpen] = React.useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = React.useState(false);
  const [context, setContext] = React.useState('');
  const [showCreateProduct, setShowCreateProduct] = React.useState(false);
  const [showScanItem, setShowScanItem] = React.useState(true);
  const [clearCreateProduct, setClearCreateProduct] = React.useState(false);
  const [showCreateItem, setShowCreateItem] = React.useState(false);
  const [barcode, setBarcode] = React.useState('');
  const [barcodeInput, setBarcodeInput] = React.useState([]);
  const [css, theme] = useStyletron();

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
        searchUPC(barcode);
      } else if(barcodeInput.length) {
        searchUPC(barcodeInput);
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
    setClearSearchUPC(false);
  }

  const doCreateItem = (item) => {
    setContext('create_item');
    setClearAddItem(false);
    createItem(item);
    setConfirmModalIsOpen(true);
    location.reload();
  }

  const doCreateProduct = (product) => {
    setContext('create_product');
    setClearCreateProduct(false);
    createProduct(product);
    setConfirmModalIsOpen(true);
  }

  const closeScannerModal = () => {
    setScannerIsOpen(false);
  }

  const closeConfirmModal = () => {
    if(context === 'create_product') {
      setClearCreateProduct(true);
      setShowCreateProduct(false);
      setShowCreateItem(true);
    }
    if(context === 'create_item') {
      setClearSearchUPC(true);
      setShowCreateItem(false);
    }
    clearData();
    setConfirmModalIsOpen(false);
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
            <ScanItem barcodeInput={barcodeInput} setBarcodeInput={setBarcodeInput} doSearch={doSearch} clearSearch={clearSearchUPC} setScannerIsOpen={setScannerIsOpen} />
          </FlexGridItem>
        : showCreateProduct ?
          <FlexGridItem key={1} {...itemProps}>
            <CreateProductForm doCreateProduct={doCreateProduct} clearCreateProduct={clearCreateProduct} upcData={upcData} />
          </FlexGridItem>
        : showCreateItem ?
        <FlexGridItem key={2} {...itemProps}>
          <CreateItem doCreateItem={doCreateItem} clearAddItem={clearAddItem}/>
        </FlexGridItem>
        : <></>
      }
      { 
        scannerIsOpen && 
        <Scanner key={3} isOpen={scannerIsOpen} close={closeScannerModal} setBarcode={setBarcode}/>
      }
    </FlexGrid>
    {confirmModalIsOpen && <ConfirmModal isOpen={confirmModalIsOpen} closeModal={closeConfirmModal} />}
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
    searchUPC,
    clearUPC,
    createProduct,
    searchProduct,
    clearProduct
  }
)(AddItem);

export default ConnectedAddItem;