import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { fetchAllItems } from '../../actions/item';
import { useStyletron } from 'baseui';
import { DeleteItemList } from '../fridge/ItemList';
import { RED, WHITE, BLACK } from '../../styles/colors';

const DeleteItems = ({ fetchAllItems, items }) => {
  const [css, theme] = useStyletron();

  useEffect(() => {
    fetchAllItems();
  }, []);

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
              onClick={() => {}}
              className={css({ backgroundColor: RED, color: BLACK })}
            >Delete</Button>
          </StyledBody>
        </Card>
      </FlexGridItem>
      <FlexGridItem className={css({ marginTop: '16px' })}>
        <DeleteItemList items={items} />
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedDeleteItems = connect(
  (state) => {
    return {
      items: state.items
    }
  }, {
    fetchAllItems
  }
)(DeleteItems);

export default ConnectedDeleteItems;