import { FETCH_ITEM } from '../constants';
import axios from 'axios';

export const fetchItem = (id) => {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/item/${id}`, {
            headers: { 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjBjNWI3ODQwMGJmMDcxZWM4OTU5MSIsImlhdCI6MTYwNTQ2NDg0NCwiZXhwIjoxNjA1NDY4NDQ0fQ.BVKaUBv-FW2FYHhsa6hgH_O8rYk_dHKEg_XeaK30nX4' }
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