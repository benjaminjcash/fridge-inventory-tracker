import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { PURPLE, WHITE, BLACK } from '../../../styles/colors';
import { updateProduct, deleteProduct } from '../../../actions/product';

const ProductDetail = ({ product, updateProduct, deleteProduct }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const { name, type, image_url } = product;
    setName(name);
    setType(type);
    setImageUrl(image_url);
  }, [product]);

  const handleDeleteProduct = () => {
    const productToDelete = { _id: product._id };
    deleteProduct(productToDelete);
  }

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: theme[BLACK] })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: theme[PURPLE]
        })}>
          <h4 className={css({  })}>Product Detail</h4>
          <h4 className={css({ color: theme[PURPLE], float: 'right', marginTop: '-48px' })}>{product.upc_code}</h4>
          <p className={css({ fontSize: '16px', marginTop: '16px', color: theme[WHITE] })}>View and Edit Product Details.</p>
          <p className={css({ fontSize: '16px',  marginTop: '-12px', marginBottom: '32px', color: theme[WHITE] })}>WARNING: These changes may affect other user's Fridges.</p>
        </Block>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[PURPLE]
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
              style: () => ({
                color: theme[PURPLE]
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
              style: () => ({
                color: theme[PURPLE]
              })
            },
            Caption: {
              style: () => ({
                color: theme[PURPLE]
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
          <img src={imageUrl} className={css({ height: '75px', width: 'auto' })}/>
        </Block>
        <Button 
          onClick={() => updateProduct(product._id, { name, type, image_url: imageUrl})}
          className={css({ backgroundColor: theme[PURPLE], color: theme[BLACK], marginTop: '32px' })}
        >Save Changes</Button>
        <Button 
          onClick={() => handleDeleteProduct(product._id)}
          className={css({ backgroundColor: theme[WHITE], color: theme[BLACK], float: 'right', marginTop: '32px' })}
          kind={KIND.secondary}
        >Delete</Button>
      </StyledBody>
    </Card>
  );
}

const ConnectedProductDetail = connect(
  (state) => {
    return {}
  }, {
    updateProduct,
    deleteProduct
  }
)(ProductDetail);

export default ConnectedProductDetail;