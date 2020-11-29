import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { RadioGroup, Radio } from "baseui/radio";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { Select, SIZE as selectSize } from 'baseui/select';
import { Input, SIZE as inputSize } from 'baseui/input';

const Controls = ({ allTypes, buildList }) => {
    const [css, $theme] = useStyletron();
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
        <Card className={css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px'
                })}><h4>Filter by...</h4></Block>
                <FormControl label={'Type'}>
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
                        onChange={({ value }) => setValueType(value)}
                        value={valueType}
                        size={selectSize.mini}
                        overrides={{
                            DropdownListItem: {
                                style: ({ $theme }) => ({
                                    fontSize: $theme.sizing.scale400
                                })
                            },
                            Tag: {
                                props: {
                                    overrides: {
                                        ActionIcon: {
                                            style: ({ $theme }) => ({
                                                height: $theme.sizing.scale400
                                            })
                                        },
                                        Text: {
                                            style: ({ $theme }) => ({
                                                fontSize: $theme.sizing.scale400
                                            })
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </FormControl>
                <FormControl label={'Name'}>
                    <Input
                        value={valueName}
                        onChange={event => setValueName(event.currentTarget.value)}
                        size={inputSize.mini}
                    />
                </FormControl>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '20px'
                })}><h4>Order by...</h4></Block>
                <FormControl label={'Attribute'}>
                    <RadioGroup
                        align="vertical"
                        name="vertical"
                        onChange={e => setValueAttribute(e.target.value)}
                        value={valueAttribute}
                    >
                        <Radio
                            value="expiration_date"
                            overrides={{
                                RadioMarkOuter: {
                                    style: ({ $theme }) => ({
                                        height: $theme.sizing.scale600,
                                        width: $theme.sizing.scale600
                                    }),
                                },
                            }}
                        >
                            <Block className={css({ fontSize: $theme.sizing.scale500 })}>Expiration Date</Block>
                        </Radio>
                        <Radio
                            value="created_date"
                            overrides={{
                                RadioMarkOuter: {
                                    style: ({ $theme }) => ({
                                        height: $theme.sizing.scale600,
                                        width: $theme.sizing.scale600
                                    }),
                                },
                            }}
                        >
                            <Block className={css({ fontSize: $theme.sizing.scale500 })}>Created Date</Block>
                        </Radio>
                    </RadioGroup>
                </FormControl>
                <FormControl label={'Direction'}>
                    <RadioGroup
                        align="vertical"
                        name="vertical"
                        onChange={e => setValueOrder(e.target.value)}
                        value={valueOrder}
                    >
                        <Radio
                            value="1"
                            overrides={{
                                RadioMarkOuter: {
                                    style: ({ $theme }) => ({
                                        height: $theme.sizing.scale600,
                                        width: $theme.sizing.scale600
                                    }),
                                },
                            }}
                        >
                            <Block className={css({ fontSize: $theme.sizing.scale500 })}>Ascending</Block>
                        </Radio>
                        <Radio
                            value="-1"
                            overrides={{
                                RadioMarkOuter: {
                                    style: ({ $theme }) => ({
                                        height: $theme.sizing.scale600,
                                        width: $theme.sizing.scale600
                                    }),
                                },
                            }}
                        >
                            <Block className={css({ fontSize: $theme.sizing.scale500 })}>Decending</Block>
                        </Radio>
                    </RadioGroup>
                </FormControl>
            </StyledBody>
        </Card>
    );
}

export default Controls;