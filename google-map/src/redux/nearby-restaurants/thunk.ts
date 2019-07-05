import { LatLng } from '../location/state'
import { ThunkDispatch } from '../../store';
import { fetchSuccess, fetchFail } from './action';
import { IRestaurant } from './state';
import * as data from '../../sample-data.json'

export const fetchRestaurant = (coordinate:LatLng)=>{
    return async (dispatch:ThunkDispatch)=>{
        // const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.lat},${coordinate.lng}&radius=100&type=restaurant&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,{
        //     method:"GET",
        // })
        // const data = await res.json();
        // if(res.status === 200 && data.status === "OK"){
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
        // }else{
        //     dispatch(fetchFail(data.error_message))
        // }
    }
}