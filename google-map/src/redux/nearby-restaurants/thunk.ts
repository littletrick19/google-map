import { LatLng } from '../location/state'
import { ThunkDispatch } from '../../store';
import { fetchSuccess, fetchFail, fetchClear } from './action';
import { IRestaurant } from './state';
import { initialState } from '../location/reducer';

export const fetchRestaurant = (coordinate:LatLng)=>{
    return async (dispatch:ThunkDispatch)=>{
        dispatch(fetchClear());
        let data = require('../../sample-data.json')
        if(coordinate !== initialState.coordinate) {
            const res = await fetch(`${process.env.REACT_APP_AWS_LAMBDA_API}?lat=${coordinate.lat}&lng=${coordinate.lng}`,{
                method:"GET",
            })
            data = await res.json();
        }
        if(data.status === "OK"){
            const restaurants = [] as IRestaurant[];
            data.results.forEach((result:any)=>{
                const restaurant = {} as any;
                restaurant['id'] = result.id;
                restaurant['name'] = result.name;
                restaurant['coordinate'] = {
                    lat:result.geometry.location.lat, lng:result.geometry.location.lng
                };
                result.opening_hours && result.opening_hours.open_now && (restaurant['open_now'] = result.opening_hours.open_now);
                result.price_level && (restaurant['price_level'] = result.price_level);
                result.rating && (restaurant['rating'] = result.rating);
                result.user_ratings_total && (restaurant['user_rating_total'] = result.user_ratings_total);
                restaurant['vicinity'] = result.vicinity;
                restaurants.push(restaurant);
            })
                dispatch(fetchSuccess(restaurants))
        }else{
            dispatch(fetchFail(data.error_message))
        }

    }
}