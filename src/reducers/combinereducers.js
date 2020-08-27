import {combineReducers} from "redux";
import productReducer from "./productreducer";

const reducers = combineReducers({
    productList:productReducer
})

export default reducers;