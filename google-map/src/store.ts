import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { INearbyRestaurantState } from "./redux/nearby-restaurants/state";
import { INearbyRestaurantActions } from "./redux/nearby-restaurants/action";
import { nearbyRestaurantReducer } from "./redux/nearby-restaurants/reducer";
import { ILocationState } from "./redux/location/state";
import { locationReducer } from "./redux/location/reducer";

export interface IRootState{
    location: ILocationState,
    nearbyRestaurant: INearbyRestaurantState
}

type IRootActions = INearbyRestaurantActions

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
    }
}

const rootReducer = combineReducers<IRootState>({
    location: locationReducer,
    nearbyRestaurant: nearbyRestaurantReducer
})

export type ThunkResult<R> = ThunkAction<R, IRootState, null, IRootActions>
export type ThunkDispatch = ThunkDispatch<IRootState, null, IRootActions>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore<IRootState, IRootActions, {}, {}>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk)
    )
)