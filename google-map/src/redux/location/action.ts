import { LatLng } from "./state";

export const locationRecenter = (coordinate:LatLng)=>{
    return{
        type: "@@LOCATION_RECENTER" as "@@LOCATION_RECENTER",
        coordinate
    }
}

type LocationActionCreator = typeof locationRecenter

export type ILocationActions = ReturnType<LocationActionCreator>