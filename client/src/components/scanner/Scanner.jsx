import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Quagga from "quagga";
import { useStyletron } from 'baseui';
import { Modal, ModalBody, SIZE, ROLE } from "baseui/modal";
import { searchUPC } from '../../actions/product';

const Scanner = ({ isOpen, close, searchUPC }) => {
  const [css] = useStyletron();
  const [barcodeImage, setBarcodeImage] = useState();
  const [barcode, setBarcode] = useState('');

  const handleOnChange = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    let img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    reader.onload = async () => {
      img.onload = () => {
        setBarcodeImage(reader.result);
      }
    }
  }

  useEffect(() => {
    startQuagga();
  }, [barcodeImage]);

  useEffect(() => {
    if(barcode.length > 0) searchUPC(barcode);
  }, [barcode]);

  const startQuagga = () => {
    Quagga.decodeSingle({
      src: barcodeImage,
      inputStream: {
        type: "ImageStream",
        constraint: {
          width: { "min": 350 },
          height: { "min": 300 },
          facingMode: "environment",
          aspectRatio: { "min": 1, "max": 2 }
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ["upc_reader", "upc_e_reader"]
      },
      locate: true
    },
      scan => {
        if(scan.codeResult) {
          alert('success! ' + scan.codeResult.code);
          setBarcode(scan.codeResult.code);
        } else {
          alert('fail!');
        }
      }
    );
  }

  return (
  <Modal
    onClose={close}
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

const ConnectedScanner = connect(null, { 
  searchUPC
})(Scanner);

export default ConnectedScanner;