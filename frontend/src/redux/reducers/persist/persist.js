import {setUserReducer} from "./set-user.js";
import {setAuthTokenReducer} from "./set-auth-token.js";

const defaultState = {
    authToken: null,
    user: null,
};

const reducers = [
    setAuthTokenReducer,
    setUserReducer,
];

export default (state = defaultState, action) => {
    return reducers.reduce((state, reducer) => {
        return reducer(state, action);
    }, state);
}