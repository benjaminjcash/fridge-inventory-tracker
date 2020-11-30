import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import {Tag, VARIANT} from 'baseui/tag';
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { Block } from 'baseui/block';
import { clearStorage } from '../utils/storage';
import Fridge from './Fridge';
import Manage from './Manage';

function Main({ currentUser }) {
    const [css, $theme] = useStyletron();
    
    const [mainItems, setMainItems] = React.useState([
        { 
            label: "My Fridge",
            value: "myFridge",
            active: true
        },
        {
            label: "Manage",
            value: "manage"
        }
    ]);
    const userItems = [
        {label: 'Logout', value: 'logout'}
    ];

    const renderActiveComponent = () => {
        const active = mainItems.filter(item => item.active);
        const activeValue = active[0].value;
        if(activeValue == 'myFridge') return <Fridge />
        if(activeValue == 'manage') return <Manage />
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
                    title={<Block className={css({ fontSize: $theme.sizing.scale700 })}>Fridge Inventory Tracker</Block>}
                    mainItems={mainItems}
                    onMainItemSelect={item => {
                        setMainItems(prev => setItemActive(prev, item));
                    }}
                    userItems={userItems}
                    username={currentUser.username}
                    usernameSubtitle={currentUser.name}
                    onUserItemSelect={handleUserItemSelect}
                    overrides={{
                        MainMenuItem: {
                            style: ({ $theme }) => ({
                              fontSize: $theme.sizing.scale550
                            })
                        }
                    }}
                />
            </FlexGridItem>
            <FlexGridItem className={css({ justifyContent: 'center'})}>
                {renderActiveComponent()}
            </FlexGridItem>
        </FlexGrid>
    );
}

export default Main;