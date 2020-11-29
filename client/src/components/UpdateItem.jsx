import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input, SIZE as inputSize } from 'baseui/input';
import { DatePicker } from "baseui/datepicker";
import { Button, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";
import { Select, SIZE as selectSize } from 'baseui/select';


const UpdateItem = ({ addItem, clearAddItem }) => {
    const [css, theme] = useStyletron();
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueExpirationDate, setValueExpirationDate] = React.useState([]);
    const [valueImageUrl, setValueImageUrl] = React.useState([]);
    const [valueItemSelect, setValueItemSelect] = React.useState([]);

    return (
        <Card className={css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px'
                })}><h4>Update Item</h4></Block>
                <FormControl label={() => "Choose an item to update"}>
                    <Select
                        options={['one', 'two']}
                        labelKey="label"
                        valueKey="id"
                        onChange={({ value }) => setValueItemSelect(value)}
                        value={valueItemSelect}
                        size={selectSize.mini}
                    />
                </FormControl>
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
                        onChange={({ date }) =>
                            setValueExpirationDate(Array.isArray(date) ? date : [date])
                        }
                        formatString="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        size={inputSize.mini}
                    />
                </FormControl>
                <FormControl label={() => "Image URL"}>
                    <Input
                        value={valueImageUrl}
                        onChange={event => setValueImageUrl(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <Button 
                    onClick={() => handleAddItem()}
                    size={buttonSize.mini}
                >Update</Button>
            </StyledBody>
        </Card>
    );
}

export default UpdateItem;