import React from 'react';
import Map from '../component/map';
import List from '../component/list';
import './homepage.scss'

const Homepage: React.FC = ()=>{
    return(
        <div id="homepage">
            <List />
            <Map />
        </div>
    )
}

export default Homepage