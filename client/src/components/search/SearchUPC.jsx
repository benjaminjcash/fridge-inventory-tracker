import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC } from '../../actions/product';
import SearchUPCForm from './SearchUPCForm';
import UPCProductList from './UPCProductList';

const SearchUPC = ({ searchUPC, upcData }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = React.useState('');
  const [offset, setOffset] = React.useState('0');
  const [showUPCProductList, setShowUPCProductList] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

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
    
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      <FlexGridItem {...itemProps}>
        <SearchUPCForm name={name} setName={setName} offset={offset} setOffset={setOffset} doSearchUPC={doSearchUPC} resultMessage={resultMessage} />
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        {showUPCProductList && <UPCProductList products={upcData.items} onProductSelect={onProductSelect} />}
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedSearchUPC = connect((state) => {
    return {
      upcData: state.upc
    }
  }, {
    searchUPC
  }
)(SearchUPC);

export default ConnectedSearchUPC;