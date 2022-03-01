import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { UPC_RESPONSE_KEY_TITLE, UPC_RESPONSE_KEY_BRAND, UPC_RESPONSE_KEY_CATEGORY, UPC_RESPONSE_KEY_IMAGES } from '../../utils/constants';

const CreateProduct = ({ doCreateProduct, clearCreateProduct, upcData }) => {
  const [css, theme] = useStyletron();
  const [valueName, setValueName] = React.useState([]);
  const [valueType, setValueType] = React.useState([]);
  const [valueImageUrl, setValueImageUrl] = React.useState([]);
  const [valueUpcData, setValueUpcData] = React.useState([]);

  const handleCreateProduct = () => {
    const product = {
      name: valueName,
      type: valueType,
      image_url: valueImageUrl,
      shelf_life: 0,
      upc_data: valueUpcData,
      upc_code: JSON.parse(valueUpcData).upc
    }
    doCreateProduct(product);
  }

  React.useEffect(() => {
    if (clearCreateProduct) {
      setValueName([]);
      setValueType([]);
      setValueImageUrl([]);
      setValueUpcData({});
    }
  }, [clearCreateProduct]);

  React.useEffect(() => {
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
          color: '#0096FF'
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Create Product</h4>
          <p className={css({ fontSize: '14px', marginTop: '4px', marginBottom: '32px' })}>This product has not yet been added to our database, override any defaults below and click <em>Create</em> to do so.</p>
        </Block>
        <FormControl label={() => "Name"}>
          <Input
            value={valueName}
            onChange={event => setValueName(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl label={() => "Type"}>
          <Input
            value={valueType}
            onChange={event => setValueType(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl label={() => "Image URL"} caption={() => "use a square image"}>
          <Input
            value={valueImageUrl}
            onChange={event => setValueImageUrl(event.currentTarget.value)}
          />
        </FormControl>
        <img src={valueImageUrl} className={css({ height: '200px', width: '200px' })}/>
        <FormControl label={() => "UPC Data"}>
          <Input
            value={valueUpcData}
            onChange={event => setValueUpcData(event.currentTarget.value)}
          />
        </FormControl>
        <Button 
          onClick={() => handleCreateProduct()}
          className={css({ backgroundColor: '#0096FF', color: 'black' })}
        >Create</Button>
      </StyledBody>
    </Card>
  );
}

export default CreateProduct;