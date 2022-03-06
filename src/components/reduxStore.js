import {render} from "react-dom";
import React from "react";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import Profile from "./../pages/Profile";

const todos = (state = {
    quote: ""
}, action) => {
    if (action.type === 'valueChanged') {
      state = {
        ...state,
        quote: action.newQuoteStr,
      };
    }
    return state;
  };
  

const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
};

const userReducer = (state = {
    name: "Max",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action);
};

const store = createStore(
    combineReducers({
        math: mathReducer, 
        todo: todos
    }),
    {}
);

store.subscribe(() => {
    // console.log("Store updated!", store.getState());
});

export default store;

/* render(
    <Provider store={store}>
        <Profile />
    </Provider>, 
    window.document.getElementById('root')); */