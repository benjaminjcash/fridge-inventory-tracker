import React from 'react';
import { useStyletron } from 'baseui';
import FilterBy from './FilterBy';
import OrderBy from './OrderBy';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const Controls = ({ allTypes, buildList }) => {
  const [css, theme] = useStyletron();
  const [valueType, setValueType] = React.useState([]);
  const [valueName, setValueName] = React.useState([]);
  const [valueAttribute, setValueAttribute] = React.useState("expiration_date");
  const [valueOrder, setValueOrder] = React.useState("1");

  React.useEffect(() => {
    const options = {
      types: valueType,
      name: valueName,
      attribute: valueAttribute,
      order: valueOrder
    }
    buildList(options);
  }, [valueType, valueName, valueAttribute, valueOrder]);
  
  return (
    <FlexGrid flexGridColumnCount={1} flexGridRowGap={theme.sizing.scale300} className={css({ marginTop: theme.sizing.scale300, width: '100%' })}>
    <FlexGridItem>
      <FilterBy allTypes={allTypes} valueType={valueType} setValueType={setValueType} valueName={valueName} setValueName={setValueName} />
    </FlexGridItem>
    <FlexGridItem>
      <OrderBy valueAttribute={valueAttribute} setValueAttribute={setValueAttribute} valueOrder={valueOrder} setValueOrder={setValueOrder} />
    </FlexGridItem>
    </FlexGrid>
  )
}

export default Controls;