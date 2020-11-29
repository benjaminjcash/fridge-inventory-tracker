import * as React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal";
import { connect } from 'react-redux';
import { clearError } from '../actions/error';

const Error = ({ error, clearError }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeError = () => {
    setIsOpen(false);
    return clearError();
  }

  React.useEffect(() => {
    setIsOpen(error.error);
  }, [error]);

  return (
    <Modal
      onClose={closeError}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      unstable_ModalBackdropScroll={true}
    >
      <ModalHeader>Error</ModalHeader>
      <ModalBody>{error.message}</ModalBody>
      <ModalFooter>
        <ModalButton onClick={closeError}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
}

const ConnectedError = connect(
  (state) => {
    return {
      error: state.error
    }
  },
  {
    clearError
  }
)(Error);

export default ConnectedError;