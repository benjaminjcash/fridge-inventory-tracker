import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { useStyletron } from 'baseui';
import Controls from './controls/Controls';
import Dashboard from './Dashboard';
import ItemList from '../shared/ItemList';
import { fetchAllItems } from '../../actions/item';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../../utils/constants';

const Fridge = ({ items, types, fetchAllItems }) => {
  const [css, theme] = useStyletron();

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content',
  };

  const buildList = (options) => {
    fetchAllItems(options, 'build_list');
  }

  React.useEffect(() => {
    fetchAllItems(DEFAULT_FETCH_ALL_ITEMS_OPTIONS, 'get_all_types');
  }, []);

  return (
    <>
    <FlexGrid flexGridColumnCount={1} flexGridRowGap={theme.sizing.scale300} className={css({ marginTop: theme.sizing.scale300, width: '100%' })}>
      <FlexGridItem>
        <Dashboard items={items}/>
      </FlexGridItem>
      <FlexGridItem {...itemProps}>
        { items.length > 0 && <div style={{ marginBottom: '-8px', width: '100%' }}><ItemList items={items} /></div> }
      </FlexGridItem>
      <FlexGridItem>
      { items.length > 0 && <Controls allTypes={types} buildList={buildList} /> }
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedFridge = connect(
  (state) => {
    return {
      items: state.items,
      types: state.types
    }
  }, {
  fetchAllItems
}
)(Fridge);

export default ConnectedFridge;