import React, { useState } from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { H4 } from 'baseui/typography';
import { ButtonGroup, SIZE, MODE } from "baseui/button-group";
import { Button } from "baseui/button";
import { clearStorage } from '../utils/storage';
import Fridge from './Fridge';
import Manage from './Manage';

function Main({ currentUser }) {
  const [css, $theme] = useStyletron();
  const [selected, setSelected] = React.useState(0);

  const logout = () => {
    clearStorage('loggedIn');
    clearStorage('access_token');
    clearStorage('refresh_token');
    window.location.href = '/';
  }

  return (
    <>
    <FlexGrid className={css({ width: 'auto', height: '100%' })}>
      <FlexGridItem className={css({ height: 'auto', backgroundColor: 'black' })}>
        <H4 className={css({ color: 'white' })}>{ selected == 0 ? "My Fridge" : "Manage" }</H4>
        <ButtonGroup 
          size={SIZE.mini} 
          mode={MODE.radio}
          selected={selected}
          onClick={(event, index) => {
            setSelected(index);
          }}
        >
          <Button>My Fridge</Button>
          <Button>Manage</Button>
          <Button onClick={logout}>Logout</Button>
        </ButtonGroup>
      </FlexGridItem>
      <FlexGridItem className={css({ justifyContent: 'center', height: 'auto' })}>
        { 
          selected == 0 ?
          <Fridge /> :
          <Manage />
        }
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

export default Main;