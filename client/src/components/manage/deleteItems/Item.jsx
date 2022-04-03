import { useStyletron } from 'baseui';
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip';
import { Block } from 'baseui/block';
import { formatDate, calculateBorderColor } from '../../../utils/helpers';
import { Card } from 'baseui/card';

const Item = ({ item }) => {
  const [css, theme] = useStyletron();
  return (
    <>
        <div>
          <Card
            className={css({ height: 'auto', width: 'auto' })}
            headerImage={item.product_id.image_url}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: 'white',
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
                  backgroundColor: 'white',
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
                })
              }
            }}
          ></Card>
        </div>
    </>
  );
}

export default Item;