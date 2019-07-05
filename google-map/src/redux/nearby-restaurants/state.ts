import { LatLng } from "../location/state";

export interface IRestaurant {
    id:string,
    name:string,
    coordinate:LatLng,
    open_now:boolean,
    price_level:number,
    rating:number,
    user_rating_total:number,
    vicinity:string
}

export interface INearbyRestaurantState{
    restaurants: Array<IRestaurant>
    msg?: string
}