import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Block } from "baseui/block";
import { Input } from 'baseui/input';
import { Button } from "baseui/button";
import { WHITE, BLACK, PINK } from '../../../styles/colors';
import CreateProduce from './CreateProduce';
import CreateItem from '../addData/CreateItem';
import ProduceResultList from './ProduceResultList';
import { createProduce, searchProduce, clearProduce, clearProduces, setProduce } from '../../../actions/produce';
import { createItem } from '../../../actions/item';

const AddProduce = ({ createProduce, searchProduce, data, produces, clearProduce, clearProduces, setProduce, createItem }) => {
  const [css, theme] = useStyletron();
  const [produceSearchTerm, setProduceSearchTerm] = useState('');
  const [showAddProduce, setShowAddProduce] = useState(true);
  const [showCreateProduce, setShowCreateProduce] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showProduceList, setShowProduceList] = useState(false);
  const [context, setContext] = useState('');

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const doCreateProduce = (produce) => {
    setContext('create_produce');
    createProduce(produce);
  }

  const doCreateItem = (item) => {
    setContext('create_item');
    createItem(item);
  }

  const doSearchProduce = (name) => {
    clearProduces();
    searchProduce(name);
  }

  useEffect(() => {
    if(produces.length > 0) {
      setShowProduceList(true);
    }
  }, [produces]);

  useEffect(() => {
    if(data.success && context == 'create_produce') {
      alert('Successfully added the Produce to the Database.');
      setShowCreateProduce(false);
      setShowCreateItem(true);
    } else if(data.success && context == 'create_item') {
      alert('Successfully added the Item to your Fridge.');
      setShowCreateItem(false);
      setShowAddProduce(true);
      setProduceSearchTerm('');
    }
  }, [data]);

  useEffect(() => {
    setShowProduceList(false);
  }, [produceSearchTerm]);

  const onProduceSelect = (index) => {
    const selected = produces[index];
    setProduce(selected);
    clearProduces();
    setShowProduceList(false);
    setShowAddProduce(false);
    setShowCreateItem(true);
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
    {
      showAddProduce &&
      <FlexGridItem key={0} {...itemProps}>
        <Card className={css({ height: 'auto', width: '100%' })} >
          <StyledBody>
            <Block className={css({
              marginBottom: '-10px',
              marginTop: '-10px',
              color: theme[PINK]
            })}>
              <h4 className={css({ marginBottom: '0px' })}>Add Produce</h4>
              <p className={css({ fontSize: '16px', marginTop: '4px', marginBottom: '32px', color: theme[WHITE] })}>Create a new produce type or search for an existing one.</p>
              </Block>
            <Button 
              onClick={() => {
                setShowCreateProduce(true);
                setShowAddProduce(false);
                setShowProduceList(false);
              }}
              className={css({ backgroundColor: theme[PINK], color: theme[BLACK], marginBottom: '16px' })}
            >Create New</Button>
            <FormControl 
              label={'Search Produce'}
              overrides={{
                Label: {
                  style: ({ $theme }) => ({
                    color: theme[PINK]
                  })
                }
              }}
            >
              <Input
                value={produceSearchTerm}
                onChange={event => setProduceSearchTerm(event.currentTarget.value)}
              />
            </FormControl>
            { produceSearchTerm.length > 0 && 
              <Button 
                onClick={() => {
                  doSearchProduce(produceSearchTerm);
                }}
                className={css({ backgroundColor: theme[PINK], color: theme[BLACK] })}
              >Search</Button>
            }
          </StyledBody>
        </Card>
      </FlexGridItem>
    }
    {
      showCreateProduce &&
      <FlexGridItem key={1} {...itemProps}>
        <CreateProduce doCreateProduce={doCreateProduce} data={data} />
      </FlexGridItem>
    }
    {
      showCreateItem &&
      <FlexGridItem key={2} {...itemProps}>
        <CreateItem doCreateItem={doCreateItem} />
      </FlexGridItem>
    }
    {
      showProduceList &&
      <FlexGridItem key={3} style={{...itemProps, width: '100%'}}>
        <ProduceResultList produces={produces} onProduceSelect={onProduceSelect} />
      </FlexGridItem>
    }
    </FlexGrid>
    </>
  );
}

const ConnectedAddProduce = connect(
  (state) => {
    return {
      data: state.data,
      produces: state.produces
    }
  }, {
    createProduce,
    searchProduce,
    clearProduce,
    clearProduces,
    setProduce,
    createItem
  }
)(AddProduce);

export default ConnectedAddProduce;