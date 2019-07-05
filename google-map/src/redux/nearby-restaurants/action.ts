import { IRestaurant } from "./state";

export const fetchSuccess = (restaurants:IRestaurant[])=>{
    return{
        type: "@@FETCH_SUCCESS" as "@@FETCH_SUCCESS",
        restaurants
    }
}

export const fetchFail = (msg:string)=>{
    return{
        type: "@@FETCH_FAIL" as "@@FETCH_FAIL",
        msg
    }
}

export const clearMsg = ()=>{
    return{
        type: "@@CLEAR_MSG" as "@@CLEAR_MSG"
    }
}

type NearbyRestaurantActionsCreator = typeof fetchSuccess|
                                        typeof fetchFail|
                                        typeof clearMsg

export type INearbyRestaurantActions = ReturnType<NearbyRestaurantActionsCreator>