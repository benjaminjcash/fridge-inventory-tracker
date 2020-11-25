import React from 'react';
import {useStyletron} from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { RadioGroup, Radio } from "baseui/radio";
import {Select } from 'baseui/select';
import {Input} from 'baseui/input';

const Controls = () => {
    const [css, theme] = useStyletron();
    
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueAttribute, setValueAttribute] = React.useState();
    const [valueOrder, setValueOrder] = React.useState();
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
                            options={[
                                {id: 'Portland', label: 'Portland'},
                                {id: 'NYC', label: 'New York City'},
                                {id: 'LosAngeles', label: 'Los Angeles'},
                                {id: 'Boston', label: 'Boston'},
                                {id: 'Atlanta', label: 'Atlanta'},
                                {id: 'SanFrancisco', label: 'San Francisco'},
                            ]}
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
                            <Radio value="oldestFirst">Expiration Date</Radio>
                            <Radio value="newestFirst">Purchase Date</Radio>
                        </RadioGroup>
                        <h4>Order:</h4>
                        <RadioGroup
                            align="horizontal"
                            name="horizontal"
                            onChange={e => setValueOrder(e.target.value)}
                            value={valueOrder}
                        >
                            <Radio value="oldestFirst">Ascending</Radio>
                            <Radio value="newestFirst">Decending</Radio>
                        </RadioGroup>
                    </StyledBody>
                </Card>
            </StyledBody>
        </Card>
    );
}

export default Controls;