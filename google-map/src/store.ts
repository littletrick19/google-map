import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IRestaurantState } from "./redux/restaurants/state";
import { IRestaurantActions } from "./redux/restaurants/action";
import { restaurantReducer } from "./redux/restaurants/reducer";
import { ILocationState } from "./redux/location/state";
import { locationReducer } from "./redux/location/reducer";

export interface IRootState{
    location: ILocationState,
    restaurant: IRestaurantState
}

type IRootActions = IRestaurantActions

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
    }
}

const rootReducer = combineReducers<IRootState>({
    location: locationReducer,
    restaurant: restaurantReducer
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