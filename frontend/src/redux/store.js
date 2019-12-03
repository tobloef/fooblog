import {applyMiddleware, compose, createStore} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "./root-reducer.js";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "persist",
    ]
};
const persistedReducers = persistReducer(persistConfig, rootReducer);
const middlewares = [];

const functions = [
    applyMiddleware(
        ...middlewares
    )
];

if (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__ != null) {
    functions.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const store = createStore(
    persistedReducers,
    compose(...functions)
);

export const persistor = persistStore(store);