import { INearbyRestaurantState } from "./state";
import { INearbyRestaurantActions } from "./action";
import { stat } from "fs";

const initialState:INearbyRestaurantState = {
    restaurants:[],
    msg:""
}

export const nearbyRestaurantReducer = (state:INearbyRestaurantState = initialState, action: INearbyRestaurantActions)=>{
    switch(action.type){
        case "@@FETCH_CLEAR":
            return {...stat, restaurants:[]}
        case "@@FETCH_SUCCESS":
            return {...state, restaurants:action.restaurants}
        case "@@FETCH_FAIL":
            return {...state, msg: action.msg}
    }
    return state
}