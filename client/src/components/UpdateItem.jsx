import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input, SIZE as inputSize } from 'baseui/input';
import { DatePicker } from "baseui/datepicker";
import { Button, KIND, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";
import { Select, SIZE as selectSize } from 'baseui/select';
import parseISO from 'date-fns/parseISO'

const UpdateItem = ({ items, doUpdateItem, clearUpdateItem }) => {
    const [css, theme] = useStyletron();
    const [itemList, setItemList] = React.useState([]);
    const [valueItemSelect, setValueItemSelect] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueType, setValueType] = React.useState([]);
    const [valueExpirationDate, setValueExpirationDate] = React.useState([]);
    const [valueImageUrl, setValueImageUrl] = React.useState([]);
    
    const clearUpdateForm = () => {
        setValueItemSelect([]);
        setValueName([]);
        setValueType([]);
        setValueExpirationDate([]);
        setValueImageUrl([]);
    }

    const handleUpdateItem = () => {
        const item = {
            id: valueItemSelect[0]._id,
            name: valueName,
            type: valueType,
            expiration_date: valueExpirationDate,
            image_url: valueImageUrl
        }
        doUpdateItem(item);
    }

    React.useEffect(() => {
        if (clearUpdateItem) {
            setValueItemSelect([]);
            setValueName([]);
            setValueType([]);
            setValueExpirationDate([]);
            setValueImageUrl([]);
        }
    }, [clearUpdateItem])

    React.useEffect(() => {
        if(valueItemSelect.length > 0) {
            const selectedItem = valueItemSelect[0];
            setValueName(selectedItem.name);
            setValueType(selectedItem.type);
            setValueExpirationDate(parseISO(selectedItem.expiration_date));
            setValueImageUrl(selectedItem.image_url);
        }

    }, [valueItemSelect])

    React.useEffect(() => {
        if(items) setItemList(items);
    }, [items])

    return (
        <Card className={css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px'
                })}><h4>Update Item</h4></Block>
                <FormControl label={() => "Choose an item to update"}>
                    <Select
                        options={itemList}
                        labelKey="name"
                        valueKey="_id"
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
                <FormControl label={() => "Image URL"}  caption={() => "use a square image"}>
                    <Input
                        value={valueImageUrl}
                        onChange={event => setValueImageUrl(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <Button 
                    onClick={() => handleUpdateItem()}
                    size={buttonSize.mini}
                >Update</Button>
                <Button 
                    onClick={() => clearUpdateForm()}
                    size={buttonSize.mini}
                    kind={KIND.secondary}
                    className={css({ float: 'right' })}
                >Clear Form</Button>
            </StyledBody>
        </Card>
    );
}

export default UpdateItem;