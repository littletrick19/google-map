import React from 'react';
import { Spinner } from 'reactstrap';

export const Loader: React.FC=()=>{
    return (
        <div>
            <Spinner color="info" />
        </div>
    );
}