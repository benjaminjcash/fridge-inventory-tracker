import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import Item from './Item';
const ItemList = () => {
    const [css, theme] = useStyletron();
    const itemProps = {
        backgroundColor: 'mono400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '250px'
    };
    return (
        <FlexGrid
            flexGridColumnCount={6}
            flexGridColumnGap={theme.sizing.scale300}
            flexGridRowGap={theme.sizing.scale400}
            width='100%'
            height='100%'
        >
            <FlexGridItem {...itemProps}>
                <Item />
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <Item />
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <Item />
            </FlexGridItem>
        </FlexGrid>
    )
}

export default ItemList;