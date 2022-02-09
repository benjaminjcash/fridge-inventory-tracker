import React from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Controls from './Controls';
import Dashboard from './Dashboard';
import ItemList from './ItemList';
import { fetchAllItems } from '../actions/item';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../utils/constants';

const Fridge = ({ items, types, fetchAllItems }) => {
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

    const buildList = (options) => {
        fetchAllItems(options, 'build_list');
    }

    React.useEffect(() => {
        fetchAllItems(DEFAULT_FETCH_ALL_ITEMS_OPTIONS, 'get_all_types');
    }, []);

    return (
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap={theme.sizing.scale300}
            className={css({ marginTop: theme.sizing.scale300, width: '100%' })}
        >
            <FlexGridItem {...narrowItemProps}>
                <FlexGrid>
                    <FlexGridItem>
                        <Dashboard items={items}/>
                    </FlexGridItem>
                    <FlexGridItem>
                        <Controls
                            allTypes={types}
                            buildList={buildList}
                        />
                    </FlexGridItem>
                </FlexGrid>
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
            items: state.items,
            types: state.types
        }
    }, {
    fetchAllItems
}
)(Fridge);

export default ConnectedFridge;