import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { PURPLE, WHITE, BLACK, RED } from '../../styles/colors';

const ProductDetail = ({ product }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    console.log(product);
    const { name, type, image_url } = product;
    setName(name);
    setType(type);
    setImageUrl(image_url);
  }, [product]);

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: WHITE })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: PURPLE
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Product Detail</h4>
          <p className={css({ fontSize: '16px', marginTop: '16px', color: BLACK })}>View and Edit Product Details.</p>
          <p className={css({ fontSize: '16px',  marginTop: '-12px', marginBottom: '32px', color: BLACK })}>WARNING: These changes may affect other user's Fridges.</p>
        </Block>
        <p className={css({ fontSize: '16px', marginTop: '-8px', color: BLACK })}><span className={css({ color: PURPLE })}>UPC Code: </span>{product.upc_code}</p>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: ({ $theme }) => ({
                color: PURPLE
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
                color: PURPLE
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
                color: PURPLE
              })
            },
            Caption: {
              style: ({ $theme }) => ({
                color: PURPLE
              })
            }
          }}
        >
          <Input
            value={imageUrl}
            onChange={event => setImageUrl(event.currentTarget.value)}
          />
        </FormControl>
        <Block>
          <img src={imageUrl} className={css({ height: '200px', width: 'auto' })}/>
        </Block>
        <Button 
          onClick={() => handleDeleteProduct()}
          className={css({ backgroundColor: PURPLE, color: WHITE, marginTop: '32px' })}
        >Save Changes</Button>
        <Button 
          onClick={() => handleDeleteProduct()}
          className={css({ backgroundColor: RED, color: WHITE, float: 'right', marginTop: '32px' })}
        >Delete</Button>
      </StyledBody>
    </Card>
  );
}

export default ProductDetail;