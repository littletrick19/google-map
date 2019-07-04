import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, useGoogleMap } from '@react-google-maps/api'
import { Loader } from './loader';
import { IRootState, ThunkDispatch } from "../store"
import { connect } from 'react-redux';
import { LatLng } from '../redux/location/state';
import { fetchRestaurant } from '../redux/restaurants/thunk';
import * as google from 'googleapis';

interface IMapProps{
    coordinate: LatLng,
    fetchRestaurant: (coordinate:LatLng)=>void
}

export const Map: React.FC<IMapProps>= (props:IMapProps)=>{
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ["places"]
    })
    
    // const map = useGoogleMap();

    useEffect(()=>{
        // const callback = (results:any, status:any)=>{
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //       console.log(results)
        //     }
        // }

        // if(map){
        //     const service = new google.maps.places.PlacesService(map)
        //     let request = {
        //         location: props.coordinate,
        //         radius: 100,
        //         type: "restaurant"
        //     }
        //     service.nearbySearch(request, callback)
        // }
        props.fetchRestaurant(props.coordinate)
    })

    const render = ()=>{
        return (
            <GoogleMap
                id='map'
                mapContainerStyle={{height:"100vh",width:"100vw"}}
                zoom={18}
                center={props.coordinate}
            />
        )
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? render(): <Loader />
}

const mapStateToProps = (state:IRootState)=>({
    coordinate:state.location.coordinate
})

const mapDispatchToProps = (dispatch:ThunkDispatch)=>({
    fetchRestaurant: (coordinate:LatLng)=> dispatch(fetchRestaurant(coordinate))
})

export default connect(mapStateToProps,mapDispatchToProps)(Map);