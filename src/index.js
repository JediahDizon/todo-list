import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

// REACT REDUX
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";

// COMPONENTS
import { Router } from "app/views";
import { Reducers } from "app/store";

// MIDDLEWARES
import ReduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";

// STYLES
// import "./styles/style.css";
import "antd/dist/antd.css";  // or 'antd/dist/antd.less'

const store = createStore(
	combineReducers(Reducers),
	applyMiddleware(
		ReduxThunk,
		createLogger({
			collapsed: true
		})
	)
);

const RootComponent = (
	<AppContainer>
		<Provider store={store}>
			<Router />
		</Provider>
	</AppContainer>
);

initialize();

ReactDOM.render(
	RootComponent,
	document.getElementById("root")
);

function initialize() {
	// For formatting a Duration object from a Moment JS object
	require("moment-duration-format");
}