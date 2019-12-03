import {combineReducers} from "redux";
import persist from "./persist.js";

const reducers = combineReducers({
    persist: persist,
});

export default reducers;
