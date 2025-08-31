import React, { useEffect, useState } from "react";
import ShowCart from "./showCart";

const Cart = () => {
    const[users,SetUser]=useState([])
    useEffect(()=>{
        fetch(`/api.json`,{
          
        })
        .then(res=>res.json())
        .then(data=>SetUser(data))
    },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[80%] m-auto gap-6">
        {
          users.map(data=><ShowCart cls  key={data.id} data={data}>
            

          </ShowCart>)
        }
    </div>
  );
};

export default Cart;
