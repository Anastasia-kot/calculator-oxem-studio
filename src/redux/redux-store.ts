import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import mainReducer from "./main-reducer.ts";
 




let RootReducer = combineReducers({
    mainPage:  mainReducer,
 
})

export type RootState = ReturnType<typeof RootReducer>

export type InferActionsTypes<T extends {[key: string]:(...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(RootReducer, compose(
    applyMiddleware(thunk)
));
 
// window.store = store;