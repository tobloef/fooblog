import {createAction, createReducer} from "redux-act";

const defaultState = {
    authToken: null,
    user: null,
};

export const setAuthTokenAction = createAction("set auth token");
export const setUserAction = createAction("set user");

export default createReducer({
    [setAuthTokenAction]: (state, authToken) => ({...state, authToken}),
    [setUserAction]: (state, user) => ({...state, user}),
}, defaultState);