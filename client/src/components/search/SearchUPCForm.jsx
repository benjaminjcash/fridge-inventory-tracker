import React, { useEffect } from 'react';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const SearchUPCForm = ({ doSearchUPC }) => {
  const [css, theme] = useStyletron();
  const [name, setName] = React.useState('');
  const [offset, setOffset] = React.useState('');
  const [matchMode, setMatchMode] = React.useState('');

  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const buildQuery = () => {
    let query = { name: name };
    if(offset) query.offset = offset;
    if(matchMode) query.matchMode = matchMode;
    doSearchUPC(query);
  }

  return (
    <>
    <FlexGrid flexGridColumnCount={1} flexGridRowGap={theme.sizing.scale300} className={css({ width: '100%' })}>
      <FlexGridItem {...itemProps}><Input key={0} value={name} placeholder="Name" onChange={e => setName(e.target.value)} clearOnEscape/></FlexGridItem>
      <FlexGridItem {...itemProps}><Input key={2} value={offset} placeholder="Offset" onChange={e => setOffset(e.target.value)} clearOnEscape/></FlexGridItem>
      <FlexGridItem {...itemProps}><Input key={3} value={matchMode} placeholder="Match Mode" onChange={e => setMatchMode(e.target.value)} clearOnEscape/></FlexGridItem>
      <FlexGridItem key={0} {...itemProps}><Button onClick={buildQuery}>Search</Button></FlexGridItem>
    </FlexGrid>
    </>
  );
}

export default SearchUPCForm;