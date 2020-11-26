import React from 'react';
import { connect } from 'react-redux';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import Controls from './Controls';
import ItemList from './ItemList';
import { fetchAllItems } from '../actions/item';

const Fridge = ({ items, fetchAllItems }) => {
    const [css, theme] = useStyletron();
    const [doFetchItems, setDoFetchItems] = React.useState(true)
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

    React.useEffect(() => {
        if(doFetchItems) {
            fetchAllItems();
            setDoFetchItems(false);
        }
    });

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
                <ItemList items={items} />
            </FlexGridItem>
        </FlexGrid>
    );
}

const ConnectedFridge = connect(
    (state) => {
        return {
        items: state.items
        }
    }, {
        fetchAllItems
    }
)(Fridge);

export default ConnectedFridge;