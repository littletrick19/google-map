import React from 'react'
import {
  Toast,
  ToastHeader,
  ToastBody,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import { IRestaurant } from '../redux/nearby-restaurants/state'

interface IDetailProps {
  restaurant: IRestaurant
}

export const Detail: React.FC<IDetailProps> = (props: IDetailProps) => {
  return (
    <Toast className="detail">
      <ToastHeader>{props.restaurant.name}</ToastHeader>
      <ToastBody>
        <ListGroup>
          {
            props.restaurant.open_now? <ListGroupItem>Now : Open</ListGroupItem>:<ListGroupItem>Now : Closed</ListGroupItem>
          }
          {
            props.restaurant.price_level&& 
            <ListGroupItem>
              Price level : {props.restaurant.price_level}
            </ListGroupItem>
          }
          {
            props.restaurant.rating&& 
            <ListGroupItem>
              Rating: {props.restaurant.rating}
              <br />(Total: {props.restaurant.user_rating_total} reviews)
              </ListGroupItem>
          }
          {
            props.restaurant.vicinity&& <ListGroupItem>Address:<br />{props.restaurant.vicinity}</ListGroupItem>
          }
        </ListGroup>
      </ToastBody>
    </Toast>
  )
}
