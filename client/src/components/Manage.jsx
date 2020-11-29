import React from 'react';
import { connect } from 'react-redux';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { Modal, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal";
import { SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import { createItem, updateItem, deleteItem, fetchAllItems } from '../actions/item';
import { clearData } from '../actions/data';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../utils/constants';

const Manage = ({ data, items, createItem, updateItem, deleteItem, fetchAllItems, clearData }) => {
    const [css, theme] = useStyletron();
    const [isOpen, setIsOpen] = React.useState(false);
    const [clearAddItem, setClearAddItem] = React.useState(false);
    const [clearUpdateItem, setClearUpdateItem] = React.useState(false);
    const [clearDeleteItem, setClearDeleteItem] = React.useState(false);

    const itemProps = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'top',
        height: 'min-content'
    };

    const doCreateItem = (item) => {
        setClearAddItem(false);
        createItem(item);
    }

    const doUpdateItem = (item) => {
        setClearUpdateItem(false);
        updateItem(item);
    }

    const doDeleteItem = (item) => {
        setClearDeleteItem(false);
        deleteItem(item);
    }

    const closeModal = () => {
        setClearAddItem(true);
        setClearDeleteItem(true);
        setClearUpdateItem(true);
        clearData();
        setIsOpen(false);
    }

    React.useEffect(() => {
        if(data.success) {
            setIsOpen(true);
        } else {
            fetchAllItems(DEFAULT_FETCH_ALL_ITEMS_OPTIONS, 'build_list');
        }
    }, [data])

    return (
        <> 
        <FlexGrid
            flexGridColumnCount={3}
            flexGridColumnGap={theme.sizing.scale300}
            className={css({ marginTop: theme.sizing.scale300, width: '100%' })}
        >
            <FlexGridItem {...itemProps}>
                <AddItem doCreateItem={doCreateItem} clearAddItem={clearAddItem}/>
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <UpdateItem doUpdateItem={doUpdateItem} items={items} clearUpdateItem={clearUpdateItem}/>
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <DeleteItem doDeleteItem={doDeleteItem} items={items} clearDeleteItem={clearDeleteItem} />
            </FlexGridItem>
        </FlexGrid>

        <Modal
            onClose={closeModal}
            closeable
            isOpen={isOpen}
            animate
            autoFocus
            size={SIZE.default}
            role={ROLE.dialog}
            unstable_ModalBackdropScroll={true}
        >
            <ModalBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px'
                })}><h4>Success!</h4></Block>
            </ModalBody>
            <ModalFooter>
                <ModalButton onClick={closeModal} size={buttonSize.mini}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
        </>
    );
}

const ConnectedManage = connect(
    (state) => {
        return {
        data: state.data,
        items: state.items
        }
    }, {
        fetchAllItems,
        createItem,
        updateItem,
        deleteItem,
        clearData
    }
)(Manage);

export default ConnectedManage;