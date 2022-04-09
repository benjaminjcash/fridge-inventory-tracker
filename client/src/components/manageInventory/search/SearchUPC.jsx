import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC, searchProduct, setUPC, createProduct, clearProduct, clearUPC } from '../../../actions/product';
import { createItem, fetchAllItems } from '../../../actions/item';
import SearchUPCForm from './SearchUPCForm';
import UPCProductList from './UPCProductList';
import CreateProductForm from '../addData/CreateProduct';
import CreateItem from '../addData/CreateItem';

const SearchUPC = ({ searchUPC, upcData, setUPC, searchProduct, product, createProduct, createItem, fetchAllItems, clearProduct, clearUPC }) => {
  const [css, theme] = useStyletron();
  const [showSearchUPCForm, setShowSearchUPCForm] = React.useState(true);
  const [showUPCProductList, setShowUPCProductList] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [name, setName] = React.useState('');
  const [offset, setOffset] = React.useState('0');
  const [resultMessage, setResultMessage] = useState('');

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

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
    setUPC(selectedProduct);
    searchProduct(selectedProduct.upc);
  }

  useEffect(() => {
    if(Object.keys(upcData).length > 0) {
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
    createItem(item);
    alert('Successfully added item to your Fridge.');
    fetchAllItems(null, 'build_list');
    resetState();
  }

  const doCreateProduct = (product) => {
    createProduct(product);
    alert('Successfully added product to the Database.')
    setShowCreateProduct(false);
  }

  const resetState = () => {
    setShowCreateItem(false);
    setShowSearchUPCForm(true);
    setName('');
    setOffset('0');
    setResultMessage('');
    clearProduct();
    clearUPC();
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
          <SearchUPCForm name={name} setName={setName} offset={offset} setOffset={setOffset} doSearchUPC={searchUPC} resultMessage={resultMessage} />
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
          <CreateItem doCreateItem={doCreateItem} />
        </FlexGridItem>
      }
      {
        showCreateProduct &&
        <FlexGridItem style={{...itemProps, marginTop: '8px' }}>
          <CreateProductForm doCreateProduct={doCreateProduct} upcData={upcData} />
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
    clearProduct,
    clearUPC
  }
)(SearchUPC);

export default ConnectedSearchUPC;