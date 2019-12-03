import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MainPage from "./MainPage.jsx";
import {Provider} from "react-redux";
import {persistor, store} from "../redux/store.js";
import {PersistGate} from "redux-persist/integration/react";

const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <Router>
                <MainPage/>
            </Router>
        </PersistGate>
    </Provider>
);

export default App;
