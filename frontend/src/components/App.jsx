import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import {persistor, store} from "../redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/react-hooks"
import { graphql } from "../graphql/graphql.js";
import MainPage from "./MainPage.jsx";

const App = () => {
    return <ApolloProvider client={graphql}>
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                    <Router>
                        <MainPage/>
                    </Router>
            </PersistGate>
        </ReduxProvider>
    </ApolloProvider>
};

export default App;
