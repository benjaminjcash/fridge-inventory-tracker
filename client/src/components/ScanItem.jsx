import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { Input, SIZE as inputSize } from 'baseui/input';
import { Button, SIZE as buttonSize } from "baseui/button";

const ScanItem = ({ doSearchUPC, clearSearchUPC }) => {
    const [css, theme] = useStyletron();
    const [valueBarcode, setValueBarcode] = React.useState([]);

    const handleSearch = () => {
        doSearchUPC(valueBarcode);
    }

    React.useEffect(() => {
        if (clearSearchUPC) {
            setValueBarcode([]);
        }
    }, [clearSearchUPC]);

    return (
        <Card className={css({ height: 'auto', width: '100%', marginTop: '-65px' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px',
                    color: 'orange'
                 })}><h4>Scan Item</h4></Block>
                <FormControl label={() => "Barcode"}>
                    <Input
                        value={valueBarcode}
                        onChange={event => setValueBarcode(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <Button 
                    onClick={() => handleSearch()}
                    size={buttonSize.mini}
                    className={css({ backgroundColor: 'orange', color: 'black' })}
                    
                >Search</Button>
            </StyledBody>
        </Card>
    );
}

export default ScanItem;