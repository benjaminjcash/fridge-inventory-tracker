import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import Item from './Item';
const ItemList = ({ items }) => {
    const [css, theme] = useStyletron();
    const itemProps = {
        backgroundColor: 'mono400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    };
    return (
        <FlexGrid
            flexGridColumnCount={10}
            flexGridColumnGap={theme.sizing.scale300}
            flexGridRowGap={theme.sizing.scale400}
            width='100%'
            height='100%'
        >
            {
                items.map((item) => {
                    return (
                        <FlexGridItem key={item._id} {...itemProps}>
                            <Item key={item._id} item={item}/>
                        </FlexGridItem>
                    );
                })
            }
        </FlexGrid>
    )
}

export default ItemList;