import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { fetchAllItems, clearSelectedItems, deleteItems, selectAllItems } from '../../../actions/item';
import { useStyletron } from 'baseui';
import ItemList from '../../shared/ItemList'
import { RED, WHITE, BLACK } from '../../../styles/colors';
import { DELETED_ITEM } from '../../../utils/constants';

const DeleteItems = ({ fetchAllItems, items, selectedItems, clearSelectedItems, deleteItems, selectAllItems, data }) => {
  const [css, theme] = useStyletron();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [selectedItems]);

  useEffect(() => {
    fetchAllItems(null, 'build_list');
  }, []);

  useEffect(() => {
    if(data.success && data.action === DELETED_ITEM) {
      alert(`Successfully removed ${selectedItems.length} item(s) from your Fridge.`)
      clearSelectedItems();
      fetchAllItems(null, 'build_list');
    }
  }, [data]);

  const buildItemList = () => items.filter(item => selectedItems.includes(item._id));
  const toggleItemList = () => showConfirm ? buildItemList() : items;

  return (
    <>
    <FlexGrid flexGridColumnCount={1} flexGridRowGap={theme.sizing.scale300} className={css({ width: '100%' })}>
      <FlexGridItem>
        <Card className={css({ height: 'auto', width: '100%' })} >
          <StyledBody>
            <Block className={css({
              marginBottom: '-10px',
              marginTop: '-10px',
              color: theme[RED]
            })}>
              <h4 className={css({ marginBottom: '-12px' })}>Delete Items</h4>
              <p className={css({ fontSize: '16px', marginTop: '16px', marginBottom: '32px', color: theme[WHITE] })}>Highlight all the Items you wish to remove from your Fridge and click Delete.</p>
            </Block>
            <Button 
              onClick={() => {
                if(!selectedItems.length > 0) {
                  setShowError(true);
                } else {
                  setShowConfirm(true);
                }
              }}
              className={css({ backgroundColor: theme[RED], color: theme[BLACK] })}
            >Delete</Button>
            <Button 
              onClick={() => selectAllItems(items)}
              className={css({ backgroundColor: theme[WHITE], color: theme[BLACK], marginLeft: '8px' })}
            >Select All</Button>
            {
              showError &&
              <p className={css({ fontSize: '16px', marginTop: '16px', color: theme[WHITE] })}>You must select at least one item to delete.</p>
            }
            {
              showConfirm &&
              <>
                <p className={css({ fontSize: '16px', marginTop: '16px', color: theme[WHITE] })}>Are you sure you want to delete these {selectedItems.length} item(s)?</p>
                <Button 
                  onClick={() => {
                    deleteItems(selectedItems);
                    fetchAllItems(null, 'build_list');
                    setShowConfirm(false);
                  }}
                  className={css({ backgroundColor: theme[RED], color: theme[BLACK], marginRight: '8px' })}
                >Yes</Button>
                <Button 
                  onClick={() => {
                    clearSelectedItems();
                    setShowConfirm(false);
                  }}
                  className={css({ backgroundColor: theme[WHITE], color: theme[BLACK] })}
                >No</Button>
              </>
            }
          </StyledBody>
        </Card>
      </FlexGridItem>
      <FlexGridItem className={css({ marginTop: '8px' })}>
        <ItemList items={toggleItemList()} isDeleteItem={true} />
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedDeleteItems = connect(
  (state) => {
    return {
      items: state.items,
      selectedItems: state.selectedItems,
      data: state.data
    }
  }, {
    fetchAllItems,
    clearSelectedItems,
    deleteItems,
    selectAllItems
  }
)(DeleteItems);

export default ConnectedDeleteItems;