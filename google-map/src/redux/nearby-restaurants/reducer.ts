import { INearbyRestaurantState } from "./state";
import { INearbyRestaurantActions } from "./action";

const initialState:INearbyRestaurantState = {
    restaurants:[],
    msg:""
}

export const nearbyRestaurantReducer = (state:INearbyRestaurantState = initialState, action: INearbyRestaurantActions)=>{
    switch(action.type){
        case "@@FETCH_SUCCESS":
            return {...state, restaurants:action.restaurants}
        case "@@FETCH_FAIL":
            return {...state, msg: action.msg}
        case "@@CLEAR_MSG":
            return {...state, msg:""}
    }
    return state
}