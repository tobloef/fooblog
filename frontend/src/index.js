import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import "./index.css";
import "semantic-ui-css/semantic.min.css";


const app = <App />;
const root = document.getElementById("root");
ReactDOM.render(app, root);
