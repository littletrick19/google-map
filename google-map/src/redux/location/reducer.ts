import { ILocationState } from "./state";
import { ILocationActions } from "./action";

const initialState:ILocationState = {
    coordinate:{lat:22.371276,lng:114.1399981},
    zoom: 18
    // coordinate:{lat:22.28005,lng:114.184877}
}

export const locationReducer = (state:ILocationState = initialState, action:ILocationActions)=>{
    switch(action.type){
        case "@@LOCATION_RECENTER":
            return {...state, coordinate:action.coordinate}
    }
    return state
}