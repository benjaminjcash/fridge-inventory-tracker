import { REQUEST_LOGIN } from '../constants';

const auth = (state={}, action) => {
    switch(action.type) {
            case REQUEST_LOGIN:
                return {...state, token: action.data.token};
            default:
                return state;
    }
}

export default auth;