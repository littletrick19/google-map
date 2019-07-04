import * as json from './sample-data.json';
import {IRestaurant} from './redux/restaurants/state'

const sampleRestaurant: IRestaurant = {
    id: "69030a2be9fe81cc3db1267412909985e3112017",
    name: "McDonald's",
    coordinate: {lat:22.3713671, lng:114.1387429},
    open_now: true,
    price_level: 1,
    rating: 3.4,
    user_rating_total: 81,
    vicinity: "葵涌石蔭邨石蔭商場二樓213及214號舖"
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

