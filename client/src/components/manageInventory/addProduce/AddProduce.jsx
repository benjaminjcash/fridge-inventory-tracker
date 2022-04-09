import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { WHITE, BLACK, PINK } from '../../../styles/colors';
import CreateProduce from './CreateProduce';
import { createProduce } from '../../../actions/produce';

const AddProduce = ({ createProduce }) => {
  const [css, theme] = useStyletron();
  const [produceSearchTerm, setProduceSearchTerm] = useState('');
  const [showAddProduce, setShowAddProduce] = useState(true);
  const [showCreateProduce, setShowCreateProduce] = useState(false);

  const doCreateProduce = (data) => {
     createProduce(data);
  }

  return (
    <>
    {
      showAddProduce &&
        <Card className={css({ height: 'auto', width: '100%' })} >
          <StyledBody>
            <Block className={css({
              marginBottom: '-10px',
              marginTop: '-10px',
              color: PINK
            })}>
              <h4 className={css({ marginBottom: '0px' })}>Add Produce</h4>
              <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: WHITE })}>Create a new produce type or search for an existing one.</p>
              </Block>
            <Button 
              onClick={() => {
                setShowCreateProduce(true);
                setShowAddProduce(false);
              }}
              className={css({ backgroundColor: PINK, color: BLACK, marginBottom: '16px' })}
            >Create New</Button>
            <FormControl label={'Search Produce'}>
              <Input
                value={produceSearchTerm}
                onChange={event => setProduceSearchTerm(event.currentTarget.value)}
              />
            </FormControl>
            { produceSearchTerm.length > 0 && 
              <Button 
                onClick={() => console.log('search')}
                className={css({ backgroundColor: PINK, color: BLACK })}
              >Search</Button>
            }
          </StyledBody>
        </Card>
    }
    {
      showCreateProduce &&
      <CreateProduce doCreateProduce={doCreateProduce} />
    }
    </>
  );
}

const ConnectedAddProduce = connect(
  (state) => {
    return {}
  }, {
    createProduce
  }
)(AddProduce);

export default ConnectedAddProduce;