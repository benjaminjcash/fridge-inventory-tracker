import React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import Controls from './Controls';
import ItemList from './ItemList';

const Fridge = () => {
    const [css, theme] = useStyletron();
    const itemProps = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'top',
        height: 'min-content'
    };
    const narrowItemProps = {
        ...itemProps,
        overrides: {
            Block: {
                style: () => ({
                    width: theme.sizing.scale1000,
                    flexGrow: 0.4,
                }),
            },
        },
    };

    return (
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap={theme.sizing.scale300}
            className={css({ marginTop: theme.sizing.scale300, width: '100%' })}
        >
            <FlexGridItem {...narrowItemProps}>
                <Controls/>
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <ItemList />
            </FlexGridItem>
        </FlexGrid>
    );
}

export default Fridge;