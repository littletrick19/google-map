import { LatLng } from "./state";

export const locationInit = (coordinate:LatLng)=>{
    return{
        type: "@@FETCH_INIT" as "@@FETCH_INIT",
        coordinate
    }
}