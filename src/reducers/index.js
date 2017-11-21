import { combineReducers } from "redux";
import cars from "./cars";

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        cars: cars
    });
}