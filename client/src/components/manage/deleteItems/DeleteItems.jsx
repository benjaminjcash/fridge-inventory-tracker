import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { fetchAllItems, clearSelectedItems, deleteItems } from '../../../actions/item';
import { useStyletron } from 'baseui';
import ItemList from '../../shared/ItemList'
import { RED, WHITE, BLACK } from '../../../styles/colors';

const DeleteItems = ({ fetchAllItems, items, selectedItems, clearSelectedItems, deleteItems }) => {
  const [css, theme] = useStyletron();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [selectedItems]);

  useEffect(() => {
    fetchAllItems();
  }, []);

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
              color: RED
            })}>
              <h4 className={css({ marginBottom: '0px' })}>Delete Items</h4>
              <p className={css({ fontSize: '16px', marginTop: '16px', marginBottom: '32px', color: WHITE })}>Highlight all the Items you wish to remove from your Fridge and click Delete.</p>
            </Block>
            <Button 
              onClick={() => {
                if(!selectedItems.length > 0) {
                  setShowError(true);
                } else {
                  setShowConfirm(true);
                }
              }}
              className={css({ backgroundColor: RED, color: BLACK })}
            >Delete</Button>
            {
              showError &&
              <p className={css({ fontSize: '16px', marginTop: '16px', color: WHITE })}>You must select at least one item to delete.</p>
            }
            {
              showConfirm &&
              <>
                <p className={css({ fontSize: '16px', marginTop: '16px', color: WHITE })}>Are you sure you want to delete these {selectedItems.length} item(s)?</p>
                <Button 
                  onClick={() => {
                    deleteItems(selectedItems);
                    clearSelectedItems();
                    setShowConfirm(false);
                  }}
                  className={css({ backgroundColor: RED, color: BLACK, marginRight: '8px' })}
                >Yes</Button>
                <Button 
                  onClick={() => {
                    clearSelectedItems();
                    setShowConfirm(false);
                  }}
                  className={css({ backgroundColor: WHITE, color: BLACK })}
                >No</Button>
              </>
            }
          </StyledBody>
        </Card>
      </FlexGridItem>
      <FlexGridItem className={css({ marginTop: '16px' })}>
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
      selectedItems: state.selectedItems
    }
  }, {
    fetchAllItems,
    clearSelectedItems,
    deleteItems
  }
)(DeleteItems);

export default ConnectedDeleteItems;