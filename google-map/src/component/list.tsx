import React, { useState } from 'react'
import {
  Toast,
  ToastHeader,
  ToastBody,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge
} from 'reactstrap'
import { IRestaurant } from '../redux/nearby-restaurants/state'
import { IRootState } from '../store'
import { connect } from 'react-redux'
import { Loader } from './loader'
import { LatLng } from '../redux/location/state';
import { locationRecenter } from '../redux/location/action';
import { Dispatch } from 'redux';

interface IListProps {  
	restaurants: IRestaurant[],
	itemOnClick: (coordinate:LatLng)=>void
}

const List: React.FC<IListProps> = (props: IListProps) => {
	const [pageNum, setPageNum] = useState(1);

	const handlePageOnClick = (event:React.MouseEvent<HTMLAnchorElement>) =>{
		setPageNum(parseInt(event.currentTarget.innerHTML,10))
	}

	const handleItemOnClick = (event:React.MouseEvent<HTMLUListElement>)=>{
		props.itemOnClick(props.restaurants[(pageNum-1)*5+parseInt(event.currentTarget.id,10)].coordinate)
	}

  const renderList = () => {
    return (
      <Toast className="list">
        <ToastHeader>
			<Badge pill>{props.restaurants.length}</Badge>
			<span style={{marginLeft:"5px"}}>Nearby Restaurant</span>
		</ToastHeader>
        <ToastBody>
          <ListGroup>
			{	
				props.restaurants.length===0 ? <ListGroupItem>No restaurant is found.</ListGroupItem>:
				props.restaurants.slice((pageNum-1)*5,pageNum*5)
				.map((restaurant: IRestaurant, i: number) =>(
					<ListGroupItem 
						key={i}
						id={i.toString()}
						className="list-item"
						onClick={handleItemOnClick.bind(i)}
					>
						{restaurant.name}
					</ListGroupItem>
				))
			}
          </ListGroup>
          <Pagination aria-label="Pagination" className="page">
			{
				Array(props.restaurants.length/5).fill(1)
					.map((x,i)=>x+i)
					.map((num, i)=>(
							<PaginationItem 
								key={i}
								className={pageNum===(i+1)? "active":""}
							>
									<PaginationLink 
										key={i} 
										href="#" 
										onClick={handlePageOnClick.bind(i)}
									>
										{num}
									</PaginationLink>
							</PaginationItem>
					))   
            }
          </Pagination>
        </ToastBody>
      </Toast>
    )
  }
  return props.restaurants ? renderList() : <Loader />
}

const mapStateToProps = (state: IRootState) => ({
  restaurants: state.nearbyRestaurant.restaurants
})

const mapDispatchToProps = (dispatch:Dispatch)=>({
	itemOnClick: (coordinate:LatLng)=>{dispatch(locationRecenter(coordinate))}
})

export default connect(mapStateToProps,mapDispatchToProps)(List)
