import {combineReducers} from "redux";
import {ResetState} from "./actions/reset-state.js";
import {SoftResetState} from "./actions/soft-reset-state.js";
import persist from "./reducers/persist/persist.js";

const combinedReducers = combineReducers({
    persist: persist,
});

export default function(state, action) {
    if (action.type === ResetState) {
        state = undefined;
    } else if (action.type === SoftResetState) {
        state = {
            persist: state.persist,
        };
    }
    return combinedReducers(state, action);
}