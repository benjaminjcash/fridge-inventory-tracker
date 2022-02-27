import React, { useState, useRef } from 'react';
import { useStyletron } from 'baseui';
import { Modal, ModalBody, SIZE, ROLE } from "baseui/modal";
import Scanner from './Scanner';
import Result from './Result';

const ScannerModal = ({ isOpen, closeModal }) => {
  const [css] = useStyletron();
  const [barcodeBlob, setBarcodeBlob] = useState();
  const [barcodeImage, setBarcodeImage] = useState();

  const handleOnChange = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    let img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);

    reader.onload = async function(){
      img.onload = function() {
        setBarcodeBlob(img);
        setBarcodeImage(reader.result);
      }
    }
  }

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
      <div>
        <input type="file" accept="image/*" capture="camera" onChange={handleOnChange} />
      </div>
    </ModalBody>
  </Modal>
  );
}

export default ScannerModal;