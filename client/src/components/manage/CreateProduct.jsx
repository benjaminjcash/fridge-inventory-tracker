import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input, SIZE as inputSize } from 'baseui/input';
import { Button, SIZE as buttonSize } from "baseui/button";
import { Block } from "baseui/block";
import { UPC_RESPONSE_KEY_TITLE, UPC_RESPONSE_KEY_BRAND, UPC_RESPONSE_KEY_CATEGORY, UPC_RESPONSE_KEY_IMAGES } from '../../utils/constants';

const CreateProduct = ({ doCreateProduct, clearCreateProduct, upcData }) => {
  const [css, theme] = useStyletron();
  const [valueName, setValueName] = React.useState([]);
  const [valueType, setValueType] = React.useState([]);
  const [valueImageUrl, setValueImageUrl] = React.useState([]);
  // const [valueShelfLife, setValueShelfLife] = React.useState([]);
  const [valueUpcData, setValueUpcData] = React.useState([]);

  const handleCreateProduct = () => {
    const product = {
      name: valueName,
      type: valueType,
      image_url: valueImageUrl,
      // shelf_life: valueShelfLife,
      upc_data: valueUpcData
    }
    doCreateProduct(product);
  }

  React.useEffect(() => {
    if (clearCreateProduct) {
      setValueName([]);
      setValueType([]);
      setValueImageUrl([]);
      // setValueShelfLife([]);
      setValueUpcData({});
    }
  }, [clearCreateProduct]);

  React.useEffect(() => {
    console.log(upcData);
    if(typeof upcData === 'object' && !Array.isArray(upcData)) {
      setValueName(`${upcData[UPC_RESPONSE_KEY_BRAND]} ${upcData[UPC_RESPONSE_KEY_TITLE]}`);
      const category = upcData[UPC_RESPONSE_KEY_CATEGORY];
      const exp = />(?:.(?!> ))+$/;
      const res = exp.exec(category)[0];
      const type = res.substring(2, res.length)
      setValueType(type);
      const images = upcData[UPC_RESPONSE_KEY_IMAGES];
      if(images.length > 0) {
        setValueImageUrl(images[0]);
      }
      setValueUpcData(JSON.stringify(upcData));
    }
  }, [upcData]);

  return (
    <Card className={css({ height: 'auto', width: '100%' })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: 'blue'
        })}><h4>Create Product</h4></Block>
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
        <FormControl label={() => "Image URL"} caption={() => "use a square image"}>
          <Input
            value={valueImageUrl}
            onChange={event => setValueImageUrl(event.currentTarget.value)}
            size={inputSize.mini}
          />
        </FormControl>

        {/* <FormControl label={() => "Shelf Life"}>
          <Input
            value={valueShelfLife}
            onChange={event => setValueShelfLife(event.currentTarget.value)}
            size={inputSize.mini}
          />
        </FormControl> */}
        <img src={valueImageUrl} className={css({ height: '200px', width: '200px' })}/>
        <FormControl label={() => "UPC Data"}>
          <Input
            value={valueUpcData}
            onChange={event => setValueUpcData(event.currentTarget.value)}
            size={inputSize.mini}
          />
        </FormControl>
        <Button 
          onClick={() => handleCreateProduct()}
          size={buttonSize.mini}
          className={css({ backgroundColor: 'Blue', color: 'white' })}
        >Create</Button>
      </StyledBody>
    </Card>
  );
}

export default CreateProduct;