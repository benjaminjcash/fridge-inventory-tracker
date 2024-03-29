import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { BLUE_GREEN, WHITE, BLACK } from '../../../styles/colors';
import { updateProduce, deleteProduce } from '../../../actions/produce';

const ProduceDetail = ({ produce, updateProduce, deleteProduce }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [shelfLife, setShelfLife] = useState('');

  useEffect(() => {
    const { name, type, image_url, shelf_life } = produce;
    setName(name);
    setType(type);
    setImageUrl(image_url);
    setShelfLife(shelf_life);
  }, [produce]);

  const handleDeleteProduce = () => {
    const produceToDelete = { _id: produce._id };
    deleteProduce(produceToDelete);
  }

  return (
    <Card className={css({ height: 'auto', width: '100%', backgroundColor: theme[BLACK] })} >
      <StyledBody>
        <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px',
          color: theme[BLUE_GREEN]
        })}>
          <h4 className={css({  })}>Produce Detail</h4>
          <p className={css({ fontSize: '16px', marginTop: '16px', color: theme[WHITE] })}>View and Edit Produce Details.</p>
          <p className={css({ fontSize: '16px',  marginTop: '-12px', marginBottom: '32px', color: theme[WHITE] })}>WARNING: These changes may affect other user's Fridges.</p>
        </Block>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[BLUE_GREEN]
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
                color: theme[BLUE_GREEN]
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
          label={() => "Shelf Life"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[BLUE_GREEN]
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
          caption={() => "use a square image"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[BLUE_GREEN]
              })
            },
            Caption: {
              style: () => ({
                color: theme[BLUE_GREEN]
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
          onClick={() => updateProduce(produce._id, { name, type, shelf_life: shelfLife, image_url: imageUrl})}
          className={css({ backgroundColor: theme[BLUE_GREEN], color: theme[BLACK], marginTop: '32px' })}
        >Save Changes</Button>
        <Button 
          onClick={() => handleDeleteProduce(produce._id)}
          className={css({ float: 'right', marginTop: '32px' })}
          kind={KIND.secondary}
        >Delete</Button>
      </StyledBody>
    </Card>
  );
}

const ConnectedProduceDetail = connect(
  (state) => {
    return {}
  }, {
    updateProduce,
    deleteProduce
  }
)(ProduceDetail);

export default ConnectedProduceDetail;