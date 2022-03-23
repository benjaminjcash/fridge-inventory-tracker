import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { searchUPC } from '../../actions/product';
import SearchUPCForm from './SearchUPCForm';

const SearchUPC = ({ searchUPC }) => {
  const [css, theme] = useStyletron();
  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doSearchUPC = (query) => {
    searchUPC(query);
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      <FlexGridItem key={0} {...itemProps}>
        <SearchUPCForm doSearchUPC={doSearchUPC} />
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedSearchUPC = connect(
  (state) => {
    return {}
  }, {
    searchUPC
  }
)(SearchUPC);

export default ConnectedSearchUPC;