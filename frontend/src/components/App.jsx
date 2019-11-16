import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MainPage from "./MainPage.jsx";

class App extends Component {
    state = {
        user: null,
    };

    render() {
        const {
            user
        } = this.state;

        return <Router>
            <MainPage
                user={user}
                setLoggedInUser={(user) => this.setState({user})}
            />
        </Router>
    }
}

export default App;
