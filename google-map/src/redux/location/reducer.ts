import { ILocationState } from "./state";

const initialState:ILocationState = {
    coordinate:{lat:22.371276,lng:114.1399981}
    // coordinate:{lat:22.28005,lng:114.184877}
}

export const locationReducer = (state:ILocationState = initialState)=>{
    // switch(action.type){
    //     case "@@LOCATION_INIT":
    //         return {...state, }
    // }
    return state
}