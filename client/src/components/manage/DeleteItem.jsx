import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Select } from 'baseui/select';

const DeleteItem = ({ items, doDeleteItem, clearDeleteItem }) => {
  const [css] = useStyletron();
  const [itemList, setItemList] = React.useState([]);
  const [valueItemSelect, setValueItemSelect] = React.useState([]);

  const handleDeleteItem = () => {
    if(!valueItemSelect.length > 0) {
      console.error("unable to delete item");
      return;
    }
    const item = valueItemSelect[0];
    doDeleteItem(item);
  }

  React.useEffect(() => {
    setItemList(items);
  }, [items]);

  React.useEffect(() => {
    if (clearDeleteItem) {
      setValueItemSelect([]);
    }
  }, [clearDeleteItem]);

  return (
    <Card className={css({ height: 'auto', width: '100%' })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: 'red'
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Delete Item</h4>
          <p className={css({ fontSize: '14px', marginBottom: '32px' })}>Choose an item to remove from your Fridge. This will <b>not</b> delete the <em>product</em> from the database.</p>
        </Block>
        <FormControl>
          <Select
            options={itemList?.map((item) => {
              return {
                id: item._id,
                label: item.product_id.name
              }
            })}
            labelKey="label"
            valueKey="id"
            onChange={({ value }) => setValueItemSelect(value)}
            value={valueItemSelect}
          />
        </FormControl>
        <Button 
          onClick={() => handleDeleteItem()}
          className={css({ backgroundColor: 'red', color: 'white' })}
        >Delete</Button>
      </StyledBody>
    </Card>
  );
}

export default DeleteItem;