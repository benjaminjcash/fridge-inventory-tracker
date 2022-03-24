import React from 'react';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";

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
            color: 'yellow'
          })}>
            <h4 className={css({ marginBottom: '0px' })}>Search UPC</h4>
            <p className={css({ fontSize: '14px', marginBottom: '32px' })}>Search the UPC database. Increase the offset to see more results.</p>
        </Block>
        <FormControl label={() => "Name"}><Input key={0} value={name} placeholder="Name" onChange={e => setName(e.target.value)} clearOnEscape/></FormControl>
        <FormControl label={() => "Offset"}><Input key={2} value={offset} placeholder="Offset" onChange={e => setOffset(e.target.value)} clearOnEscape/></FormControl>
        <Button className={css({ backgroundColor: 'yellow', color: 'black', marginTop: '16px' })} onClick={buildQuery}>Search</Button>
        {resultMessage && <p style={{ color: 'yellow', fontSize: '14px' }}>{resultMessage}</p>}
      </StyledBody>
    </Card>
    </>
  );
}

export default SearchUPCForm;