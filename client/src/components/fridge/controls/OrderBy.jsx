import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { RadioGroup, Radio } from "baseui/radio";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";

const OrderBy = ({ valueAttribute, setValueAttribute, valueOrder, setValueOrder }) => {
  const [css, $theme] = useStyletron();
  
  return (
  <Card className={css({ height: 'auto', width: 'auto' })} >
    <StyledBody>
    {/* <Block className={css({
      marginBottom: '-10px',
      marginTop: '20px'
    })}><h4>Order</h4></Block> */}
    <FormControl label={'Attribute'}>
      <RadioGroup
      align="vertical"
      name="vertical"
      onChange={e => setValueAttribute(e.target.value)}
      value={valueAttribute}
      >
      <Radio
        value="expiration_date"
        // overrides={{
        //   RadioMarkOuter: {
        //     style: ({ $theme }) => ({
        //       height: $theme.sizing.scale600,
        //       width: $theme.sizing.scale600
        //     }),
        //   },
        // }}
      >
        {/* <Block className={css({ fontSize: $theme.sizing.scale500 })}>Expiration Date</Block> */}
        <Block>Expiration Date</Block>
      </Radio>
      <Radio
        value="created_date"
        // overrides={{
        //   RadioMarkOuter: {
        //     style: ({ $theme }) => ({
        //       height: $theme.sizing.scale600,
        //       width: $theme.sizing.scale600
        //     }),
        //   },
        // }}
      >
        {/* <Block className={css({ fontSize: $theme.sizing.scale500 })}>Purchased Date</Block> */}
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
      <Radio
        value="1"
        // overrides={{
        //   RadioMarkOuter: {
        //     style: ({ $theme }) => ({
        //       height: $theme.sizing.scale600,
        //       width: $theme.sizing.scale600
        //     }),
        //   },
        // }}
      >
        {/* <Block className={css({ fontSize: $theme.sizing.scale500 })}>Ascending</Block> */}
        <Block>Ascending</Block>
      </Radio>
      <Radio
        value="-1"
        // overrides={{
        //   RadioMarkOuter: {
        //     style: ({ $theme }) => ({
        //       height: $theme.sizing.scale600,
        //       width: $theme.sizing.scale600
        //     }),
        //   },
        // }}
      >
        {/* <Block className={css({ fontSize: $theme.sizing.scale500 })}>Decending</Block> */}
        <Block>Decending</Block>
      </Radio>
      </RadioGroup>
    </FormControl>
    </StyledBody>
  </Card>
  );
}

export default OrderBy;