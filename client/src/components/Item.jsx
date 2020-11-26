import {useStyletron} from 'baseui';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';

const Item = ({ item }) => {
    const [css, theme] = useStyletron();

    const formatDate = (date) => {
        let dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US");
    }

    return (
        <Card
            className={ css({ height: '100%', width: '100%', borderTopWidth: '0px' })}
            headerImage={item.image_url}
            title={item.name}
            overrides={{
                HeaderImage: {
                  style: ({ $theme }) => ({
                    width: 'max'
                  })
                }
            }}
        >
        <StyledBody>
            <p className={css({ lineHeight: '1px'})}>{item.type}  </p>
            <h3 className={css({ lineHeight: '1px', float: 'right'})}>exp. {formatDate(item.expiration_date)}</h3>
            <p className={css({ lineHeight: '1px', float: 'right'})}>purchased {formatDate(item.created_date)}</p>
        </StyledBody>
      </Card>
    )
}

export default Item;