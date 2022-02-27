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
import ScanItem from './ScanItem';
import CreateProduct from './CreateProduct';
import { createItem, updateItem, deleteItem, fetchAllItems } from '../actions/item';
import { searchUPC, createProduct } from '../actions/product';
import { clearData } from '../actions/data';
import { DEFAULT_FETCH_ALL_ITEMS_OPTIONS } from '../utils/constants';

const Manage = ({ data, items, upcData, createItem, updateItem, deleteItem, fetchAllItems, clearData, searchUPC, createProduct }) => {
    const [css, theme] = useStyletron();
    const [isOpen, setIsOpen] = React.useState(false);
    const [clearAddItem, setClearAddItem] = React.useState(false);
    const [clearSearchUPC, setClearSearchUPC] = React.useState(false);
    const [clearUpdateItem, setClearUpdateItem] = React.useState(false);
    const [clearDeleteItem, setClearDeleteItem] = React.useState(false);
    const [clearCreateProduct, setClearCreateProduct] = React.useState(false);

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

    const doSearchUPC = (barcode) => {
        setClearSearchUPC(false);
        searchUPC(barcode);
    }

    const doUpdateItem = (item) => {
        setClearUpdateItem(false);
        updateItem(item);
    }

    const doDeleteItem = (item) => {
        setClearDeleteItem(false);
        deleteItem(item);
    }

    const doCreateProduct = (product) => {
        setClearCreateProduct(false);
        createProduct(product);
    }

    const closeModal = () => {
        setClearAddItem(true);
        setClearDeleteItem(true);
        setClearUpdateItem(true);
        setClearCreateProduct(true);
        setClearSearchUPC(true);
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
            flexGridColumnCount={1}
            flexGridRowGap={theme.sizing.scale300}
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
            <FlexGridItem {...itemProps}>
                <ScanItem doSearchUPC={doSearchUPC} clearSearchUPC={clearSearchUPC} />
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
                <CreateProduct doCreateProduct={doCreateProduct} clearCreateProduct={clearCreateProduct} upcData={upcData} />
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
            items: state.items,
            upcData: state.upc
        }
    }, {
        fetchAllItems,
        createItem,
        updateItem,
        deleteItem,
        clearData,
        searchUPC,
        createProduct
    }
)(Manage);

export default ConnectedManage;