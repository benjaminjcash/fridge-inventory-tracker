import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input, SIZE as inputSize } from 'baseui/input';
import { DatePicker } from "baseui/datepicker";
import { Button, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";


const AddItem = ({ doCreateItem, clearAddItem }) => {
    const [css, theme] = useStyletron();
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueExpirationDate, setValueExpirationDate] = React.useState([]);
    const [valueImageUrl, setValueImageUrl] = React.useState([]);

    const handleAddItem = () => {
        const item = {
            name: valueName,
            type: valueType,
            expiration_date: valueExpirationDate,
            image_url: valueImageUrl
        }
        doCreateItem(item);
    }

    React.useEffect(() => {
        if (clearAddItem) {
            setValueType([]);
            setValueName([]);
            setValueExpirationDate([]);
            setValueImageUrl([]);
        }
    }, [clearAddItem]);

    return (
        <Card className={css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px',
                    color: 'green'
                })}><h4>Add Item</h4></Block>
                <FormControl label={() => "Name"}>
                    <Input
                        value={valueName}
                        onChange={event => setValueName(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <FormControl label={() => "Type"}>
                    <Input
                        value={valueType}
                        onChange={event => setValueType(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <FormControl label={() => "Expiration Date"}>
                    <DatePicker
                        value={valueExpirationDate}
                        onChange={({ date }) => {
                            setValueExpirationDate(Array.isArray(date) ? date : [date]);
                        }}
                        formatString="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        size={inputSize.mini}
                    />
                </FormControl>
                <FormControl label={() => "Image URL"} caption={() => "use a square image"}>
                    <Input
                        value={valueImageUrl}
                        onChange={event => setValueImageUrl(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <Button 
                    onClick={() => handleAddItem()}
                    size={buttonSize.mini}
                    className={css({ backgroundColor: 'green', color: 'white' })}
                >Add</Button>
            </StyledBody>
        </Card>
    );
}

export default AddItem;