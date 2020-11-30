import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input, SIZE as inputSize } from 'baseui/input';
import {ListItem } from 'baseui/list';
import { DatePicker } from "baseui/datepicker";
import { Button, KIND as buttonKind, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";


const AddItem = ({ doCreateItem, doSearchCommonItems, clearAddItem, commonItems, doClearCommonItems }) => {
    const [css, theme] = useStyletron();
    const [valueType, setValueType] = React.useState([]);
    const [valueName, setValueName] = React.useState([]);
    const [valueExpirationDate, setValueExpirationDate] = React.useState([]);
    const [valueImageUrl, setValueImageUrl] = React.useState([]);
    const [commonItemMode, setCommonItemMode] = React.useState(false);
    const [valueCommonItemSearch, setValueCommonItemSearch] = React.useState([]);

    const handleSearchCommonItem = () => {
        doSearchCommonItems(valueCommonItemSearch);
    }

    const handleChooseCommonItem = (commonItemId) => {
        const chosenCommonItemList = commonItems.filter((commonItem) => commonItem._id == commonItemId);
        const chosenCommonItem = chosenCommonItemList[0];
        setValueName(chosenCommonItem.name);
        setValueType(chosenCommonItem.type);
        setValueImageUrl(chosenCommonItem.image_url);
        const now = new Date();
        const calculatedExpirationDate = new Date(now.getFullYear(),now.getMonth(),now.getDate() + chosenCommonItem.shelf_life);
        setValueExpirationDate(calculatedExpirationDate);
        setCommonItemMode(false);
        doClearCommonItems();
    }

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
                    marginTop: '-10px'
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
                            setCommonItemMode(false);
                        }}
                        formatString="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        size={inputSize.mini}
                    />
                </FormControl>
                
                <Button
                    onClick={() => {
                        setCommonItemMode(!commonItemMode);
                        setValueExpirationDate([]);
                    }}
                    size={buttonSize.mini} 
                    kind={buttonKind.secondary}
                    className={css({ marginBottom: '20px' })}
                >No Expiration Date?</Button>
                {
                    commonItemMode &&
                    <Card
                        className={css({ height: 'auto', width: '100%' })}
                    >
                        <FormControl label={() => "Search for Common Item"} caption={() => "see if the item exists in our database"}>
                            <Input
                                value={valueCommonItemSearch}
                                onChange={event => setValueCommonItemSearch(event.currentTarget.value)}
                                size={inputSize.mini}
                            />
                        </FormControl>
                        <Button 
                            onClick={() => handleSearchCommonItem()}
                            size={buttonSize.mini}
                        >Search</Button>
                        {
                            commonItems.length > 0 &&
                            commonItems.map((commonItem) => {
                                return (
                                    <ListItem
                                        endEnhancer={() => (
                                            <Button 
                                                size="mini" 
                                                kind="secondary" 
                                                shape="pill"
                                                onClick={() => handleChooseCommonItem(commonItem._id)}
                                            >Use</Button>
                                        )}
                                        key={commonItem._id}
                                    >   
                                        <Block className={css({ fontSize: '14px' })}>
                                            {commonItem.name}
                                            <Block className={css({ fontSize: '12px' })}>
                                                {commonItem.shelf_life} days
                                            </Block>
                                        </Block>
                                    </ListItem>
                                );
                            })
                        }
                    </Card>
                }
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
                >Add</Button>
            </StyledBody>
        </Card>
    );
}

export default AddItem;