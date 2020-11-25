import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
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

    const renderActiveComponent = () => {
        const active = mainItems.filter(item => item.active);
        const activeValue = active[0].value;
        if(activeValue == 'myFridge') return <Fridge />
        if(activeValue == 'addItem') return <Add />
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
                />
            </FlexGridItem>
            <FlexGridItem className={css({ justifyContent: 'center'})}>
                {renderActiveComponent()}
            </FlexGridItem>
        </FlexGrid>
    );
}

export default Main;