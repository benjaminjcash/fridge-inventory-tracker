import React from 'react';
import { connect } from 'react-redux';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {useStyletron} from 'baseui';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal";
import AddItem from './AddItem';
import { createItem } from '../actions/item';
import { clearData } from '../actions/data';

const Manage = ({ data, createItem, clearData }) => {
    const [css, theme] = useStyletron();
    const [response, setResponse] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [clearAddItem, setClearAddItem] = React.useState(false);

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

    const addItem = (item) => {
        setClearAddItem(false);
        createItem(item);
    }

    const closeModal = () => {
        clearData();
        setIsOpen(false);
      }

    React.useEffect(() => {
        if(data.success) {
            setResponse(data.data);
            setIsOpen(true);
            setClearAddItem(true);
        }
    }, [data])

    return (
        <> 
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap={theme.sizing.scale300}
            className={css({ marginTop: theme.sizing.scale300, width: '100%' })}
        >
            <FlexGridItem {...narrowItemProps}>
                <AddItem addItem={addItem} clearAddItem={clearAddItem}/>
            </FlexGridItem>
            <FlexGridItem {...itemProps}>
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
            <ModalHeader>Success</ModalHeader>
                <ModalBody>{response?.name ? `added ${response.name} to your fridge` : null}</ModalBody>
            <ModalFooter>
                <ModalButton onClick={closeModal}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
        </>
    );
}

const ConnectedManage = connect(
    (state) => {
        return {
        data: state.data
        }
    }, {
        createItem,
        clearData
    }
)(Manage);

export default ConnectedManage;