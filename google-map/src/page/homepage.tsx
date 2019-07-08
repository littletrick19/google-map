import React, { useState, useEffect, Dispatch } from 'react';
import Map from '../component/map';
import List from '../component/list';
import './homepage.scss'
import { IRestaurant } from '../redux/nearby-restaurants/state';
import { Detail } from '../component/detail';
import { IRootState } from '../store';
import { connect } from 'react-redux';
import { LatLng } from '../redux/location/state';
import { ILocationActions, locationRetrieve } from '../redux/location/action';
import { MdMyLocation } from 'react-icons/md'

interface IHomeProps{
    locationRetrieve: (currentCoordinate:LatLng)=>void,
    restaurants:IRestaurant[]
}

const Homepage: React.FC<IHomeProps> = (props:IHomeProps)=>{
    const [detail, setDetail] = useState<number|undefined>(undefined)
    const [coordinate, setCoordinate] = useState<LatLng|undefined>(undefined)
    const handleClick = (i:number|undefined)=>{
        setDetail(i);
    }

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position);
                    setCoordinate({lat:position.coords.latitude, lng:position.coords.longitude})
                }
            )
        } else {
            console.log(`Please click to allow the retrieval of your position`)
        }
    }

    useEffect(()=>{
        coordinate && props.locationRetrieve(coordinate)
        console.log(`coordinate: ${coordinate}`)
    },[coordinate])

    const render = ()=>{
        return(
            <div id="homepage">
                <List />
                {(detail !==undefined) && <Detail restaurant={props.restaurants[detail]}/>}
                <span id="location-button" onClick={getGeoLocation}>Test<MdMyLocation/></span>
                <Map onMarkerClick={handleClick}/>
            </div>
        )
    }
    return render();
}

const mapStateToProps = (state:IRootState)=>({
    restaurants:state.nearbyRestaurant.restaurants
})

const mapDispatchToProps = (dispatch:Dispatch<ILocationActions>)=>({
    locationRetrieve: (currentCoordinate:LatLng) => dispatch(locationRetrieve(currentCoordinate))
})

export default connect(mapStateToProps,mapDispatchToProps)(Homepage)