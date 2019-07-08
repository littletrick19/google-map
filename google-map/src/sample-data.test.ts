import * as json from './sample-data.json';
import {IRestaurant} from './redux/nearby-restaurants/state'

const sampleRestaurant: IRestaurant = {
    id: "641d95afb491e9e91ed41354ccee9f37cd98e408",
    name: "Jin Luo Bao Korean Restaurant",
    coordinate: {lat:22.2805, lng:114.184929},
    open_now: true,
    rating: 4.2,
    user_rating_total: 129,
    vicinity: "Island Centre, 號 金 百 利 商業 中心 6 樓, 1 Great George Street, Causeway Bay"
}

describe('the unpacking of data in thunk action',()=>{
    it('read the status', ()=>{
        expect(json.status).toEqual("OK")
    })
    
    it('unpack the data into the desired array', ()=>{
        const restaurants = [] as any;
        json.results.forEach(result=>{
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
        expect(restaurants.length).toEqual(20);
        expect(restaurants[0]).toMatchObject<IRestaurant>(sampleRestaurant);
    })
})

