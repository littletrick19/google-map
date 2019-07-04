import { IRestaurantState } from "./state";
import { IRestaurantActions } from "./action";

const initialState:IRestaurantState = {
    restaurants:[],
    msg:""
}

export const restaurantReducer = (state:IRestaurantState = initialState, action: IRestaurantActions)=>{
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