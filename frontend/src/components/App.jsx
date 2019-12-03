import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MainPage from "./MainPage.jsx";
import {Provider} from "react-redux";
import {persistor, store} from "../redux/store.js";
import {Loader} from "semantic-ui-react";
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
    render() {
        return <Provider store={store}>
            <PersistGate
                loading={<Loader active content={"Loading..."} />}
                persistor={persistor}
            >
                <Router>
                    <MainPage/>
                </Router>
            </PersistGate>
        </Provider>
    }
}

export default App;
