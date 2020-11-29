import {useStyletron} from 'baseui';
import { Card } from 'baseui/card';
import {StatefulTooltip, PLACEMENT} from 'baseui/tooltip';
import {Block} from 'baseui/block';

const Item = ({ item }) => {
    const [css, theme] = useStyletron();

    const formatDate = (date) => {
        let dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US");
    }

    return (
    <>
    <StatefulTooltip
      content={() => (
        <>
        <h4>{item.name}</h4>
        <Block
          className={ css({ fontStyle: 'italic' })}
        >
        <p>{item.type}</p>
        <p>exp. {formatDate(item.expiration_date)}</p>
        <p >pur. {formatDate(item.created_date)}</p>
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
            className={ css({ height: 'auto', width: 'auto' })}
            headerImage={item.image_url}
            overrides={{
              Body: {
                style: ({ $theme }) => ({
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
                  marginBottom: '-4px'
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