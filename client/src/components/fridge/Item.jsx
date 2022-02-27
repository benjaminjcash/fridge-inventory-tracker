import { useStyletron } from 'baseui';
import { Card } from 'baseui/card';
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip';
import { Block } from 'baseui/block';

const Item = ({ item }) => {
  const [css, theme] = useStyletron();

  const formatDate = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US");
  }

  const calculateBorderColor = (item) => {
    let borderColor = '';
    switch (item.expiration_health) {
      case "bad":
        borderColor = 'red';
        break;
      case "close":
        borderColor = 'yellow';
        break;
      case "fine":
        borderColor = 'green';
        break;
      case "fresh":
        borderColor = 'white';
        break;
      default:
        borderColor = 'white';
        break
    }
    return borderColor;
  }

  return (
    <>
      <StatefulTooltip
        content={() => (
          <>
            <h4>{item.product_id.name}</h4>
            <Block className={css({ fontStyle: 'italic' })}>
              <p>{item.product_id.type}</p>

              <p>exp. {formatDate(item.expiration_date)}</p>
              <p >pur. {formatDate(item.created_date)}</p>
            </Block>
            <Block className={css({ fontWeight: 'bold', fontStyle: 'normal' })} >
              <p>{item.expiration_health.toUpperCase()}</p>
            </Block>
          </>
        )}
        returnFocus
        showArrow
        popoverMargin={0}
        placement={PLACEMENT.bottom}
      >
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
      </StatefulTooltip>
    </>
  );
}

export default Item;