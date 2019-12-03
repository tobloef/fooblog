export const SET_USER = "SET_USER";

export const setUserAction = (user) => ({
    type: SET_USER,
    payload: user
});

export function setUserReducer(state, action) {
    if (action.type !== SET_USER) {
        return state;
    }
    return {
        ...state,
        user: action.payload
    }
}