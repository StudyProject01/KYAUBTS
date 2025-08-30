import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Route = ({data}) => {
    const [datas,SetDatas]=useState()
    const{id,Location,Route,Distance}=data
    
    return (
        <div>
          
            {/* <p>{datas.Route}</p> */}
            {/* <p>{Distance}</p> */}
        </div>
    );
};

export default Route;