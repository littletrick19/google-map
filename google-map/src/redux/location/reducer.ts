import { ILocationState } from "./state";
import { ILocationActions } from "./action";

export const initialState:ILocationState = {
    coordinate:{lat:22.28005,lng:114.184877},
    zoom: 19
}

export const locationReducer = (state:ILocationState = initialState, action:ILocationActions)=>{
    switch(action.type){
        case "@@LOCATION_RETRIEVE":
            return {...state, coordinate:action.currentCoordinate}
        case "@@LOCATION_RECENTER":
            return {...state, coordinate:action.coordinate, zoom:19}
        case "@@LOCATION_FAIL":
            return {...state, msg:"Failed in locating"}
    }
    return state
}