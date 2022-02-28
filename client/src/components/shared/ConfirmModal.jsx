import React from 'react';
import { useStyletron } from 'baseui';
import { SIZE as buttonSize } from 'baseui/button';
import { Modal, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal";
import { Block } from "baseui/block";

const ConfirmModal = ({ isOpen, closeModal }) => {
  const [css] = useStyletron();

  return (
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
      <ModalButton onClick={closeModal}>OK</ModalButton>
    </ModalFooter>
  </Modal>
  );
}

export default ConfirmModal;