export interface LatLng{
    lat: number,
    lng: number
}

export interface ILocationState{
    coordinate: LatLng,
    currentCoordinate?: LatLng,
    zoom: number,
    msg?:string
}