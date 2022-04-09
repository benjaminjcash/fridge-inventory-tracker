import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { PINK, WHITE, BLACK } from '../../../styles/colors';

const CreateProduce = ({ doCreateProduce }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateProduce = () => {
    doCreateProduce({ name, type, shelfLife, imageUrl });
  }

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: theme[BLACK] })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: theme[PINK]
        })}>
          <h4 className={css({ marginBottom: '0px' })}>Create Produce</h4>
          <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: theme[WHITE] })}>Enter new produce details.</p>
        </Block>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[WHITE]
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
                color: theme[WHITE]
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
          label={() => "Shelf Life (days)"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[WHITE]
              })
            }
          }}
        >
          <Input
            value={shelfLife}
            onChange={event => setShelfLife(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl 
          label={() => "Image URL"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[WHITE]
              })
            }
          }}
        >
          <Input
            value={imageUrl}
            onChange={event => setImageUrl(event.currentTarget.value)}
          />
        </FormControl>
        { imageUrl && <img src={imageUrl} className={css({ height: '75px', width: 'auto', display: 'flex' })}/> }
        <Button 
          onClick={() => handleCreateProduce()}
          className={css({ backgroundColor: theme[PINK], color: theme[BLACK], marginTop: '17px' })}
        >Create</Button>
      </StyledBody>
    </Card>
  );
}

export default CreateProduce;