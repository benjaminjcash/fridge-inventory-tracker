import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { RadioGroup, Radio } from "baseui/radio";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";

const OrderBy = ({ valueAttribute, setValueAttribute, valueOrder, setValueOrder }) => {
  const [css] = useStyletron();
  
  return (
    <Card className={css({ height: 'auto', width: 'auto' })} >
      <StyledBody>
      <FormControl label={'Attribute'}>
        <RadioGroup
          align="vertical"
          name="vertical"
          onChange={e => setValueAttribute(e.target.value)}
          value={valueAttribute}
        >
          <Radio value="expiration_date">
            <Block>Expiration Date</Block>
          </Radio>
          <Radio value="created_date">
            <Block>Purchased Date</Block>
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
          <Radio value="1" >
            <Block>Ascending</Block>
          </Radio>
          <Radio value="-1" >
            <Block>Decending</Block>
          </Radio>
        </RadioGroup>
      </FormControl>
      </StyledBody>
    </Card>
  );
}

export default OrderBy;