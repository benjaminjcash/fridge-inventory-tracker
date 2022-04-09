import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { DatePicker } from "baseui/datepicker";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { GREEN, WHITE, BLACK } from '../../../styles/colors';

const CreateItem = ({ doCreateItem, product, produce }) => {
  const [css, theme] = useStyletron();
  const [valueExpirationDate, setValueExpirationDate] = React.useState();
  const [context, setContext] = React.useState('');

  useEffect(() => {
    if(Object.keys(product).length > 0) {
      setValueExpirationDate(new Date());
      setContext('product');
    } else if(Object.keys(produce).length > 0) {
      setValueExpirationDate(calculateExpirationDateForProduce())
      setContext('produce');
    }
  }, [product, produce]);

  const calculateExpirationDateForProduce = () => {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + produce.shelf_life);
    return expDate;
  }

  const handleAddItem = () => {
    if(valueExpirationDate.length === 0) {
      alert('You must enter an expiration date to save an item.');
      return;
    }
    let lookupKey, lookupValue;
    if(context == 'product') {
      lookupKey = 'product_id';
      lookupValue = product._id;
    } else if(context == 'produce') {
      lookupKey = 'produce_id';
      lookupValue = produce._id;
    }

    const item = {
      [lookupKey]: lookupValue,
      expiration_date: valueExpirationDate,
    }
    doCreateItem(item);
    setValueExpirationDate([]);
  }

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: BLACK })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: GREEN
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Add Item</h4>
          { context == 'product' && <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '-8px', color: WHITE })}>Set the expiration date and click Add to add the item to your Fridge.</p> }
          { context == 'produce' && <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '-8px', color: WHITE })}>The expiration date has been set automatically set based on this Produce's shelf life. Click Add to add the item to your Fridge.</p> }
        </Block>
        { context == 'product' && 
          <>
          <p className={css({ fontSize: '16px', marginTop: '32px', color: WHITE })}><span className={css({ color: GREEN})}>Name: </span>{product.name}</p>
          <p className={css({ fontSize: '16px', marginTop: '-8px', color: WHITE })}><span className={css({ color: GREEN})}>Type: </span>{product.type}</p>
          <img src={product.image_url} className={css({ height: '75px', width: 'auto' })}/>
          </>
        }
        { context == 'produce' && 
          <>
          <p className={css({ fontSize: '16px', marginTop: '32px', color: WHITE })}><span className={css({ color: GREEN})}>Name: </span>{produce.name}</p>
          <p className={css({ fontSize: '16px', marginTop: '-8px', color: WHITE })}><span className={css({ color: GREEN})}>Type: </span>{produce.type}</p>
          <img src={produce.image_url} className={css({ height: '75px', width: 'auto' })}/>
          </>
        }
        <FormControl 
          label={() => "Expiration Date"}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: GREEN
              })
            }
          }}
        >
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
          className={css({ backgroundColor: GREEN, color: BLACK })}
        >Add</Button>
      </StyledBody>
    </Card>
  );
}

const ConnectedCreateItem = connect(
  (state) => {
    return {
      product: state.product,
      produce: state.produce
    }
  }
)(CreateItem);

export default ConnectedCreateItem;