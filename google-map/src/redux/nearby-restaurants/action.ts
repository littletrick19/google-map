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

export const fetchClear = ()=>{
    return{
        type: "@@FETCH_CLEAR" as "@@FETCH_CLEAR"
    }
}

type NearbyRestaurantActionsCreator = typeof fetchSuccess|
                                        typeof fetchFail|
                                        typeof fetchClear
                                        
export type INearbyRestaurantActions = ReturnType<NearbyRestaurantActionsCreator>