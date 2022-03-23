import React, { useEffect } from 'react';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const SearchUPCForm = ({ doSearchUPC }) => {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');
  const itemProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    height: 'min-content'
  };

  const buildQuery = () => {
    const query = {
      name: value
    }
    doSearchUPC(query);
  }

  return (
    <>
    <FlexGrid
      flexGridColumnCount={1}
      flexGridRowGap={theme.sizing.scale300}
      className={css({ width: '100%' })}
    >
      <FlexGridItem key={0} {...itemProps}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          clearOnEscape
        />
        <Button onClick={buildQuery}>Search</Button>
      </FlexGridItem>
    </FlexGrid>
    </>
  );
}

export default SearchUPCForm;