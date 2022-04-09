import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { H4 } from 'baseui/typography';
import { ButtonGroup, MODE } from "baseui/button-group";
import { Button, SIZE } from "baseui/button";
import { clearStorage } from '../utils/storage';
import Fridge from './fridge/Fridge';
import ManageInventory from './manageInventory/ManageInventory';
import ManageDatabase from './manageDatabase/ManageDatabase';
import { clearUPC, clearProduct } from '../actions/product';
import { fetchAllItems } from '../actions/item';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../utils/constants';

function Main({ clearUPC, fetchAllItems, clearProduct }) {
  const [css] = useStyletron();
  const [selected, setSelected] = React.useState(0);

  const logout = () => {
    clearStorage('loggedIn');
    clearStorage('access_token');
    clearStorage('refresh_token');
    window.location.href = '/';
  }

  useEffect(() => {
    fetchAllItems(DEFAULT_FETCH_ALL_ITEMS_OPTIONS, 'build_list');
  }, []);

  return (
    <>
    <FlexGrid className={css({ width: '100%', maxWidth: '900px', height: '100%' })}>
      <FlexGridItem className={css({ height: 'auto', backgroundColor: '#141414' })}>
        <Button className={css({ float: 'right' })} onClick={logout}>Logout</Button>
        <H4 className={css({ color: 'white', marginLeft: '16px' })}>{ selected == 0 ? "My Fridge" : selected == 1 ? "Manage" : "Search" }</H4>
        <ButtonGroup
          mode={MODE.radio}
          selected={selected}
          onClick={(event, index) => {
            clearUPC();
            clearProduct();
            setSelected(index);
          }}
          size={SIZE.compact}
        >
          <Button>My Fridge</Button>
          <Button>Manage Inventory</Button>
          <Button>Manage Database</Button>
        </ButtonGroup>
      </FlexGridItem>
      <FlexGridItem className={css({ justifyContent: 'center', height: 'auto' })}>
        { 
          selected == 0 ?
          <><Fridge /></> 
          : selected == 1 ?
          <ManageInventory />
          : <ManageDatabase />
        }
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

const ConnectedMain = connect(null, 
  {
    clearUPC,
    fetchAllItems,
    clearProduct
  }
)(Main);

export default ConnectedMain;