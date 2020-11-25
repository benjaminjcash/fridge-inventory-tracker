import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { Redirect } from "react-router-dom";
import { clearStorage } from '../utils/storage';
import Fridge from './Fridge';
import Add from './Add';

function Main() {
    const [css, theme] = useStyletron();
    const [mainItems, setMainItems] = React.useState([
        { 
            label: "My Fridge",
            value: "myFridge",
            active: true
        },
        {
            label: "Add",
            value: "addItem"
        }
    ]);
    const userItems = [
        {label: 'Logout', value: 'logout'}
    ];

    const renderActiveComponent = () => {
        const active = mainItems.filter(item => item.active);
        const activeValue = active[0].value;
        if(activeValue == 'myFridge') return <Fridge />
        if(activeValue == 'addItem') return <Add />
    }

    const handleUserItemSelect = (item) => {
        if(item.value == 'logout') {
            clearStorage('loggedIn');
            clearStorage('access_token');
            clearStorage('refresh_token');
            window.location.href = '/';
        }
    }

    return (
        <FlexGrid className={css({width: '100%'})}>
            <FlexGridItem>
                <AppNavBar
                    title="Fridge Inventory Tracker"
                    mainItems={mainItems}
                    onMainItemSelect={item => {
                        setMainItems(prev => setItemActive(prev, item));
                    }}
                    userItems={userItems}
                    username="Username"
                    usernameSubtitle="Real Name"
                    onUserItemSelect={handleUserItemSelect}
                />
            </FlexGridItem>
            <FlexGridItem className={css({ justifyContent: 'center'})}>
                {renderActiveComponent()}
            </FlexGridItem>
        </FlexGrid>
    );
}

export default Main;