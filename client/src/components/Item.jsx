import {useStyletron} from 'baseui';
import {Card, StyledBody} from 'baseui/card';

const Item = ({ item }) => {
    const [css, theme] = useStyletron();

    const formatDate = (date) => {
        let dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US");
    }

    return (
        <Card
            className={ css({ height: '100%', width: '100%', borderTopWidth: '0px' })}
            headerImage={'https://source.unsplash.com/user/erondu/700x400'}
            title={item.name}
        >
        <StyledBody>
            <p>{item.type}</p>
            <p>Expiration: {formatDate(item.expiration_date)}</p>
            <p>Purchase: {formatDate(item.created_date)}</p>
        </StyledBody>
      </Card>
    )
}

export default Item;