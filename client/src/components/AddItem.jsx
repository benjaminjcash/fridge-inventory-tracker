import React from 'react';
import {useStyletron} from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import {Input} from 'baseui/input';
import { DatePicker } from "baseui/datepicker";
import { Button } from 'baseui/button';

const AddItem = ({ addItem, clearAddItem }) => {
    const [css, theme] = useStyletron();
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueExpirationDate, setValueExpirationDate] = React.useState([]);
    const [valueImageUrl, setValueImageUrl] = React.useState([]);

    const handleAddItem = () => {
        const item =  {
            name: valueName,
            type: valueType,
            expiration_date: valueExpirationDate,
            image_url: valueImageUrl
        }
        addItem(item);
    }

    React.useEffect(() => {
        if(clearAddItem) {
            setValueType([]);
            setValueName([]);
            setValueExpirationDate([]);
            setValueImageUrl([]);
        }
    }, [clearAddItem])

    return (
        <Card title="Add Item" className={ css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <FormControl label={() => "Name"}>
                    <Input
                        value={valueName}
                        onChange={event => setValueName(event.currentTarget.value)}
                    />
                </FormControl>
                <FormControl label={() => "Type"}>
                    <Input
                        value={valueType}
                        onChange={event => setValueType(event.currentTarget.value)}
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
                    />
                </FormControl>
                <FormControl label={() => "Image URL"}>
                    <Input
                        value={valueImageUrl}
                        onChange={event => setValueImageUrl(event.currentTarget.value)}
                    />
                </FormControl>
                <Button onClick={() => handleAddItem()}>Add</Button>
            </StyledBody>
        </Card>
    );
}

export default AddItem;