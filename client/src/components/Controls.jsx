import React from 'react';
import {useStyletron} from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { RadioGroup, Radio } from "baseui/radio";
import {Select } from 'baseui/select';
import {Input} from 'baseui/input';

const Controls = ({ allTypes, buildList }) => {
    const [css, theme] = useStyletron();
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueAttribute, setValueAttribute] = React.useState("expiration_date");
    const [valueOrder, setValueOrder] = React.useState("1");

    React.useEffect(() => {
        const options = {
            types: valueType,
            name: valueName,
            attribute: valueAttribute,
            order: valueOrder
        }
        buildList(options);
    }, [valueType, valueName, valueAttribute, valueOrder]);

    return (
        <Card title="Controls" className={ css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Card>
                    <StyledBody>
                        <h3>Filter by...</h3>
                        <h4>Type:</h4>
                        <Select
                            creatable
                            multi
                            options={allTypes?.map(type => {
                                return {
                                    id: type,
                                    label: type
                                }
                            })}
                            labelKey="label"
                            valueKey="id"
                            onChange={({value}) => setValueType(value)}
                            value={valueType}
                        />
                        <h4>Name:</h4>
                        <Input
                            value={valueName}
                            onChange={event => setValueName(event.currentTarget.value)}
                        />
                    </StyledBody>
                </Card>
                <Card>
                    <StyledBody>
                        <h3>Sort by...</h3>
                        <h4>Attribute:</h4>
                        <RadioGroup
                            align="horizontal"
                            name="horizontal"
                            onChange={e => setValueAttribute(e.target.value)}
                            value={valueAttribute}
                        >
                            <Radio value="expiration_date">Expiration Date</Radio>
                            <Radio value="created_date">Purchase Date</Radio>
                        </RadioGroup>
                        <h4>Order:</h4>
                        <RadioGroup
                            align="horizontal"
                            name="horizontal"
                            onChange={e => setValueOrder(e.target.value)}
                            value={valueOrder}
                        >
                            <Radio value="1">Ascending</Radio>
                            <Radio value="-1">Decending</Radio>
                        </RadioGroup>
                    </StyledBody>
                </Card>
            </StyledBody>
        </Card>
    );
}

export default Controls;