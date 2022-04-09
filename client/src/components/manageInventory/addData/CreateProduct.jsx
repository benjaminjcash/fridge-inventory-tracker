import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { UPC_RESPONSE_KEY_TITLE, UPC_RESPONSE_KEY_BRAND, UPC_RESPONSE_KEY_CATEGORY, UPC_RESPONSE_KEY_IMAGES } from '../../../utils/constants';
import { BLUE, WHITE, BLACK } from '../../../styles/colors';

const CreateProduct = ({ doCreateProduct, upcData }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState([]);
  const [valueUpcData, setValueUpcData] = React.useState([]);

  const handleCreateProduct = () => {
    const product = {
      name: name,
      type: type,
      image_url: imageUrl,
      upc_data: valueUpcData,
      upc_code: JSON.parse(valueUpcData).upc
    }
    doCreateProduct(product);
    clearForm();
  }

  const clearForm = () => {
    setName([]);
    setType([]);
    setImageUrl([]);
    setValueUpcData({});
  }

  React.useEffect(() => {
    if(typeof upcData === 'object' && Object.keys(upcData).length > 0) {
      setName(`${upcData[UPC_RESPONSE_KEY_BRAND]} ${upcData[UPC_RESPONSE_KEY_TITLE]}`);
      const category = upcData[UPC_RESPONSE_KEY_CATEGORY];
      const exp = />(?:.(?!> ))+$/;
      const res = exp.exec(category)[0];
      const type = res.substring(2, res.length)
      setType(type);
      const images = upcData[UPC_RESPONSE_KEY_IMAGES];
      if(images.length > 0) {
        setImageUrl(images[0]);
      }
      setValueUpcData(JSON.stringify(upcData));
    }
  }, [upcData]);

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: BLACK })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: BLUE
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Create Product</h4>
          <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: WHITE })}>This product has not yet been added to our database, override any defaults below and click Create.</p>
        </Block>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: BLUE
              })
            }
          }}
        >
          <Input
            value={name}
            onChange={event => setName(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl 
          label={() => "Type"}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: BLUE
              })
            }
          }}
        >
          <Input
            value={type}
            onChange={event => setType(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl 
          label={() => "Image URL"}
          caption={() => "use a square image"}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: BLUE
              })
            },
            Caption: {
              style: ({ $theme }) => ({
                color: BLUE
              })
            }
          }}
        >
          <Input
            value={imageUrl}
            onChange={event => setImageUrl(event.currentTarget.value)}
          />
        </FormControl>
        <img src={imageUrl} className={css({ height: '75px', width: 'auto', display: 'block', marginBottom: '16px' })}/>
        <Button 
          onClick={() => handleCreateProduct()}
          className={css({ backgroundColor: BLUE, color: BLACK })}
        >Create</Button>
      </StyledBody>
    </Card>
  );
}

export default CreateProduct;