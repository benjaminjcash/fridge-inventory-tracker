import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC } from '../../actions/product';
import SearchUPCForm from './SearchUPCForm';
import UPCProductList from './UPCProductList';

const SearchUPC = ({ searchUPC, upcData }) => {
  const [css, theme] = useStyletron();
  const [showUPCProductList, setShowUPCProductList] = useState(false);

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
    if(upcData.error) alert(upcData.error.message);
    if(upcData.code === 'OK') setShowUPCProductList(true);
    if(Object.keys(upcData).length === 0) setShowUPCProductList(false);
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
        {showUPCProductList ? <UPCProductList products={upcData.items} onProductSelect={onProductSelect} /> : <SearchUPCForm doSearchUPC={doSearchUPC} />}
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