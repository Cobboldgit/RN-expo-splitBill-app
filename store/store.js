import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import {
  getFirebase,
  reduxReactFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import firebase from "../firebase/firebase";
import appReducer from "./reducers/appReducer";

const rootReducers = combineReducers({
  appReducer,
  firebaseReducer,
});

export const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
    reduxReactFirebase(firebase)
  )
);
