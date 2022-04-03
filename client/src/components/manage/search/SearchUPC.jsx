import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC, searchProduct, setUPC, createProduct, clearProduct } from '../../../actions/product';
import { createItem, fetchAllItems } from '../../../actions/item';
import SearchUPCForm from './SearchUPCForm';
import UPCProductList from './UPCProductList';
import CreateProductForm from '../addData/CreateProduct';
import CreateItem from '../addData/CreateItem';

const SearchUPC = ({ searchUPC, upcData, setUPC, searchProduct, product, createProduct, createItem, fetchAllItems, clearProduct }) => {
  const [css, theme] = useStyletron();
  const [showSearchUPCForm, setShowSearchUPCForm] = React.useState(true);
  const [showUPCProductList, setShowUPCProductList] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [name, setName] = React.useState('');
  const [offset, setOffset] = React.useState('0');
  const [resultMessage, setResultMessage] = useState('');
  const [selectedUPCProduct, setSelectedUPCProduct] = useState({});
  const [clearAddItem, setClearAddItem] = React.useState(false);
  const [clearCreateProduct, setClearCreateProduct] = React.useState(false);

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doSearchUPC = (query) => {
    searchUPC(query);
  }

  useEffect(() => {
    if(upcData.error) {
      alert(upcData.error.message);
      setResultMessage('');
    }
    if(upcData.code === 'OK') {
      setShowUPCProductList(true);
      setResultMessage(`Showing items ${offset ? offset : '0'}-${upcData.offset} of ${upcData.total}.`);
    }
    if(Object.keys(upcData).length === 0) {
      setShowUPCProductList(false);
      setResultMessage('');
    }
  }, [upcData]);

  const onProductSelect = (index) => {
    setShowSearchUPCForm(false);
    const selectedProduct = upcData.items[index];
    setSelectedUPCProduct(selectedProduct);
    searchProduct(selectedProduct.upc);
  }

  useEffect(() => {
    if(Object.keys(selectedUPCProduct).length > 0) {
      setUPC(selectedUPCProduct);
      if(Object.keys(product).length > 0) {
        setShowUPCProductList(false);
        setShowCreateItem(true);
      } else {
        setShowUPCProductList(false);
        setShowCreateProduct(true);
      }
    }
  }, [product]);

  const doCreateItem = (item) => {
    setClearAddItem(false);
    createItem(item);
    alert('Successfully added item to your Fridge.');
    fetchAllItems(null, 'build_list');
    setShowCreateItem(false);
    setShowSearchUPCForm(true);
    setName('');
    setOffset('0');
    setResultMessage('');
    clearProduct();
    setShowCreateProduct(false);
    setSelectedUPCProduct({});
  }

  const doCreateProduct = (product) => {
    setClearCreateProduct(false);
    createProduct(product);
    alert('Successfully added product to the database.')
    setShowCreateProduct(false);
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      {
        showSearchUPCForm &&
        <FlexGridItem {...itemProps}>
          <SearchUPCForm name={name} setName={setName} offset={offset} setOffset={setOffset} doSearchUPC={doSearchUPC} resultMessage={resultMessage} />
        </FlexGridItem>
      }
      {
        showUPCProductList &&
        <FlexGridItem {...itemProps}>
          <UPCProductList products={upcData.items} onProductSelect={onProductSelect} />
        </FlexGridItem>
      }
      {
        showCreateItem &&
        <FlexGridItem {...itemProps} style={{ marginTop: '8px' }}>
          <CreateItem doCreateItem={doCreateItem} clearAddItem={clearAddItem}/>
        </FlexGridItem>
      }
      {
        showCreateProduct &&
        <FlexGridItem style={{...itemProps, marginTop: '8px' }}>
          <CreateProductForm doCreateProduct={doCreateProduct} clearCreateProduct={clearCreateProduct} upcData={upcData} />
        </FlexGridItem>
      }
    </FlexGrid>
    </>
  );
}

const ConnectedSearchUPC = connect((state) => {
    return {
      upcData: state.upc,
      product: state.product
    }
  }, {
    searchUPC,
    setUPC,
    searchProduct,
    createProduct,
    createItem,
    fetchAllItems,
    clearProduct
  }
)(SearchUPC);

export default ConnectedSearchUPC;