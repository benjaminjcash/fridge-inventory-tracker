import axios from 'axios';
import { getStorage } from '../utils/storage';
import { BASE_URL } from '../utils/constants';
// const BARCODE = '049000011340';
// const UPC_ENDPOINT = `${BASE_URL}upc/${BARCODE}`;

export const searchUPC = (barcode) => {
    const accessToken = getStorage('access_token');
    return (dispatch) => {
        const UPC_ENDPOINT = `${BASE_URL}upc/${barcode}`;
        axios.get(`${UPC_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log('res');
            console.log(res.data.items);
        }).catch((err) => {
            console.error(err);
        });
    }
}