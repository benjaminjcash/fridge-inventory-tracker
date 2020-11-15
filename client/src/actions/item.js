import { FETCH_ITEM } from '../constants';
import axios from 'axios';

export const fetchItem = (id) => {
    return function(dispatch) {
        // do some async stuff to fetch item
        axios.get(`http://localhost:3001/api/item/${id}`, {
            headers: { 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjBjNWI3ODQwMGJmMDcxZWM4OTU5MSIsImlhdCI6MTYwNTQyNDIzNiwiZXhwIjoxNjA1NDI3ODM2fQ.uNXv8wXuKu5WMLroLw57hVJl8ew7h2yztJMd55sw4io' }
        }).then((res) => {
            dispatch({
                type: FETCH_ITEM,
                data: res.data
            })
        }).catch((err) => {
            console.error(err);
        });
    }
}