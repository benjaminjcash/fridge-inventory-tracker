import React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Block } from "baseui/block";
import { Select, SIZE as selectSize } from 'baseui/select';
import { Input, SIZE as inputSize } from 'baseui/input';

const FilterBy = ({ allTypes, valueType, setValueType, valueName, setValueName }) => {
  const [css, $theme] = useStyletron();
  
  return (
    <Card className={css({ height: 'auto', width: 'auto' })} >
      <StyledBody>
        {/* <Block className={css({
          marginBottom: '-10px',
          marginTop: '-10px'
        })}><h4>Filter</h4></Block> */}
        <FormControl label={'Type'}>
          <Select
            creatable
            multi
            options={allTypes?.map(type => {
              return {
                id: type,
                label: type
              }
            })}
            labelKey="label"
            valueKey="id"
            onChange={({ value }) => setValueType(value)}
            value={valueType}
            // size={selectSize.mini}
            overrides={{
              DropdownListItem: {
                style: ({ $theme }) => ({
                  fontSize: $theme.sizing.scale400
                })
              },
              Tag: {
                props: {
                  overrides: {
                    ActionIcon: {
                      style: ({ $theme }) => ({
                        height: $theme.sizing.scale400
                      })
                    },
                    Text: {
                      style: ({ $theme }) => ({
                        fontSize: $theme.sizing.scale400
                      })
                    }
                  }
                }
              }
            }}
          />
        </FormControl>
        <FormControl label={'Name'}>
          <Input
            value={valueName}
            onChange={event => setValueName(event.currentTarget.value)}
            // size={inputSize.mini}
          />
        </FormControl>
      </StyledBody>
    </Card>
  );
}

export default FilterBy;