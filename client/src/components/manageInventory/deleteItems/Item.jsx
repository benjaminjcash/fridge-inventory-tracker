import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { calculateBorderColor } from '../../../utils/helpers';
import { Card } from 'baseui/card';
import { setSelectedItem, removeSelectedItem } from '../../../actions/item';
import { WHITE } from '../../../styles/colors'

const Item = ({ item, setSelectedItem, removeSelectedItem, selectedItems }) => {
  const [css, theme] = useStyletron();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => setIsSelected(selectedItems.includes(item._id)), [selectedItems]);

  return (
    <Card
      className={css({ height: 'auto', width: 'auto' })}
      headerImage={item.product_id ? item.product_id.image_url : item.produce_id.image_url}
      onClick={() => {
        if(isSelected) {
          removeSelectedItem(item._id);
        } else {
          setSelectedItem(item._id)
        }
      }}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            backgroundColor: WHITE,
            borderBottomColor: calculateBorderColor(item),
            borderBottomWidth: '5px',
            borderBottomStyle: 'solid',
            borderLeftColor: calculateBorderColor(item),
            borderLeftWidth: '5px',
            borderLeftStyle: 'solid',
            borderTopStyle: 'none',
            borderRightStyle: 'none'
          })
        },
        Body: {
          style: ({ $theme }) => ({
            backgroundColor: WHITE,
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
          })
        },
        Contents: {
          style: ({ $theme }) => ({
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
          })
        },
        HeaderImage: {
          style: ({ $theme }) => ({
            width: 'max',
            marginBottom: '-4px',
            filter: isSelected ? 'grayscale(100%)' : 'none'
          })
        }
      }}
    ></Card>
  );
}
const ConnectedItem = connect(
  (state) => {
    return {
      selectedItems: state.selectedItems
    }
  }, {
    setSelectedItem,
    removeSelectedItem
  }
)(Item);

export default ConnectedItem;