import { Card } from 'baseui/card';
import {useStyletron} from 'baseui';

const Item = () => {
    const [css, theme] = useStyletron();
    return (
        <Card className={ css({ height: '100%', width: '100%', borderTopWidth: '0px' })}>
            <h1>Item</h1>
        </Card>
    )
}

export default Item;