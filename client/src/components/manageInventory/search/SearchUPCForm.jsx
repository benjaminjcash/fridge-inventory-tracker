import React from 'react';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { YELLOW, WHITE, BLACK } from '../../../styles/colors';

const SearchUPCForm = ({ name, setName, offset, setOffset, doSearchUPC, resultMessage }) => {
  const [css, theme] = useStyletron();

  const buildQuery = () => {
    let query = { name: name };
    if(offset) query.offset = offset;
    doSearchUPC(query);
  }

  return (
    <>
    <Card className={css({ height: 'auto', width: '100%', marginTop: '8px' })} >
      <StyledBody>
        <Block className={css({
            marginBottom: '-10px',
            marginTop: '-10px',
            color: theme[YELLOW]
          })}>
            <h4 className={css({ marginBottom: '0px' })}>Search Products</h4>
            <p className={css({ fontSize: '16px', marginBottom: '32px', marginTop: '4px', color: theme[WHITE] })}>Search the UPC database for a product. You can increase the offset to see more results.</p>
        </Block>
        <FormControl 
          label={() => "Name"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[YELLOW]
              })
            }
          }}
        ><Input key={0} value={name} placeholder="Name" onChange={e => setName(e.target.value)} clearOnEscape/>
        </FormControl>
        <FormControl 
          label={() => "Offset"}
          overrides={{
            Label: {
              style: () => ({
                color: theme[YELLOW]
              })
            }
          }}
        ><Input key={2} value={offset} placeholder="Offset" onChange={e => setOffset(e.target.value)} clearOnEscape/>
        </FormControl>
        <Button className={css({ backgroundColor: theme[YELLOW], color: theme[BLACK], marginTop: '16px' })} onClick={buildQuery}>Search</Button>
        {resultMessage && <div>
          <p style={{ color: theme[WHITE], fontSize: '16px' }}>{resultMessage}</p>
          <p style={{ color: theme[WHITE], fontSize: '16px' }}>Click the image to add the item to your Fridge.</p>
        </div>}
      </StyledBody>
    </Card>
    </>
  );
}

export default SearchUPCForm;