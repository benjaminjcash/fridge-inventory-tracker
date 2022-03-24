import React from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { DatePicker } from "baseui/datepicker";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

const CreateItem = ({ doCreateItem, clearAddItem, product }) => {
  const [css, theme] = useStyletron();
  const [valueExpirationDate, setValueExpirationDate] = React.useState([]);

  const handleAddItem = () => {
    if(valueExpirationDate.length === 0) {
      alert('You must enter an expiration date to save an item.');
      return;
    }
    const item = {
      product_id: product._id,
      expiration_date: valueExpirationDate,
    }
    doCreateItem(item);
  }

  React.useEffect(() => {
    if (clearAddItem) {
      setValueExpirationDate([]);
    }
  }, [clearAddItem]);

  return (
    <Card className={css({ height: 'auto', width: '100%' })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: 'green'
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Add Item</h4>
          <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: 'white' })}>Set the expiration date and click Add to add the item to your Fridge.</p>
        </Block>
        <p className={css({ fontSize: '16px', marginTop: '32px' })}><span className={css({ color: 'green'})}>Name: </span>{product.name}</p>
        <p className={css({ fontSize: '16px', marginTop: '-8px' })}><span className={css({ color: 'green'})}>Type: </span>{product.type}</p>
        <img src={product.image_url} className={css({ height: '200px', width: '200px' })}/>
        <FormControl label={() => "Expiration Date"}>
          <DatePicker
            value={valueExpirationDate}
            onChange={({ date }) => {
              setValueExpirationDate(Array.isArray(date) ? date : [date]);
            }}
            formatString="MM/dd/yyyy"
            placeholder="mm/dd/yyyy"
          />
        </FormControl>
        <Button 
          onClick={() => handleAddItem()}
          className={css({ backgroundColor: 'green', color: 'white' })}
        >Add</Button>
      </StyledBody>
    </Card>
  );
}

const ConnectedCreateItem = connect(
  (state) => {
    return {
      product: state.product
    }
  }
)(CreateItem);

export default ConnectedCreateItem;