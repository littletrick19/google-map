/*global google*/
import React, { useEffect } from 'react'
import { GoogleMap, useLoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import { Loader } from './loader'
import { IRootState, ThunkDispatch } from '../store'
import { connect } from 'react-redux'
import { LatLng, ILocationState } from '../redux/location/state'
import { fetchRestaurant } from '../redux/nearby-restaurants/thunk'
import { IRestaurant } from '../redux/nearby-restaurants/state';
import markerIcon from '../icons/marker.png';

interface IMapProps {
  location: ILocationState,
  restaurants: IRestaurant[],
  fetchRestaurant: (coordinate: LatLng) => void,
  onMarkerClick: (i:number|undefined)=>void
}

const Map: React.FC<IMapProps> = (props: IMapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })

  useEffect(() => {
    props.fetchRestaurant(props.location.currentCoordinate)
  },[props.location.currentCoordinate])

  const render = () => {
    return (
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: '100vh', width: '100vw' }}
        zoom={props.location.zoom}
        center={props.location.coordinate}
      >
        <MarkerClusterer
        options={{imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"}}
        >
          {(clusterer) =>
            props.restaurants.map((restaurant: IRestaurant, i: number) => (
              <Marker
                key={i}
                icon={{
                  url:markerIcon,
                  anchor: new google.maps.Point(15,30),
                  scaledSize: new google.maps.Size(5, 5, "vw", "vw")
                }}
                position={restaurant.coordinate}
                clusterer={clusterer}
                onMouseDown={props.onMarkerClick.bind(i,i)}
                onMouseUp={props.onMarkerClick.bind(i,undefined)}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? render() : <Loader />
}

const mapStateToProps = (state: IRootState) => ({
  location: state.location,
  restaurants: state.nearbyRestaurant.restaurants
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  fetchRestaurant: (coordinate: LatLng) => dispatch(fetchRestaurant(coordinate))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
