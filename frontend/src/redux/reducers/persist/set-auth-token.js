export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";

export const setAuthTokenAction = (authToken) => ({
    type: SET_AUTH_TOKEN,
    payload: authToken
});

export function setAuthTokenReducer(state, action) {
    if (action.type !== SET_AUTH_TOKEN) {
        return state;
    }
    return {
        ...state,
        authToken: action.payload
    }
}