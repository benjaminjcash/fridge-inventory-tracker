import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Button, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";
import { Select, SIZE as selectSize } from 'baseui/select';

const DeleteItem = ({  }) => {
    const [css, theme] = useStyletron();
    const [valueItemSelect, setValueItemSelect] = React.useState([]);

    return (
        <Card className={css({ height: 'auto', width: '100%' })} >
            <StyledBody>
                <Block className={css({
                    marginBottom: '-10px',
                    marginTop: '-10px'
                })}><h4>Delete Item</h4></Block>
                <FormControl label={() => "Choose an item to delete"}>
                    <Select
                        options={['one', 'two']}
                        labelKey="label"
                        valueKey="id"
                        onChange={({ value }) => setValueItemSelect(value)}
                        value={valueItemSelect}
                        size={selectSize.mini}
                    />
                </FormControl>
                <Button 
                    onClick={() => handleAddItem()}
                    size={buttonSize.mini}
                >Delete</Button>
            </StyledBody>
        </Card>
    );
}

export default DeleteItem;