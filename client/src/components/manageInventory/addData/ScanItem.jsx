import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { Input, SIZE as inputSize } from 'baseui/input';
import { Button, SIZE as buttonSize } from "baseui/button";
import { ORANGE, WHITE, BLACK } from '../../../styles/colors';

const ScanItem = ({ barcodeInput, setBarcodeInput, doSearch, clearSearch, setScannerIsOpen }) => {
  const [css, theme] = useStyletron();

  React.useEffect(() => {
    if (clearSearch) {
      setBarcodeInput([]);
    }
  }, [clearSearch]);

  return (
    <Card className={css({ height: 'auto', width: '100%' })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: ORANGE
         })}>
           <h4 className={css({ marginBottom: '0px' })}>Scan Item</h4>
           <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: WHITE })}>Click Scan to open your camera, or you can enter the barcode manually below.</p>
          </Block>
        <Button 
          onClick={() => setScannerIsOpen(true)}
          className={css({ backgroundColor: ORANGE, color: BLACK, marginBottom: '16px' })}
        >Scan</Button>
        <FormControl 
          label={'Enter Barcode'}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: ORANGE
              })
            }
          }}
        >
          <Input
            value={barcodeInput}
            onChange={event => setBarcodeInput(event.currentTarget.value)}
          />
        </FormControl>
        { barcodeInput.length > 0 && 
          <Button 
            onClick={doSearch}
            className={css({ backgroundColor: ORANGE, color: BLACK })}
          >Search</Button>
        }
      </StyledBody>
    </Card>
  );
}

export default ScanItem;