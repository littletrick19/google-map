import { LatLng } from "./state";

export const locationRetrieve = (currentCoordinate:LatLng)=>{
    return{
        type: "@@LOCATION_RETRIEVE" as "@@LOCATION_RETRIEVE",
        currentCoordinate
    }
}

export const locationRecenter = (coordinate:LatLng)=>{
    return{
        type: "@@LOCATION_RECENTER" as "@@LOCATION_RECENTER",
        coordinate
    }
}

export const locationFail = (msg:string)=>{
    return{
        type: "@@LOCATION_FAIL" as "@@LOCATION_FAIL",
        msg
    }
}

type LocationActionCreator = typeof locationRetrieve|
                             typeof locationRecenter|
                             typeof locationFail

export type ILocationActions = ReturnType<LocationActionCreator>