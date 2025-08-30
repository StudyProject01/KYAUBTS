import React, { useEffect, useState } from "react";
import ShowCart from "./showCart";

const Cart = () => {
  const [users, SetUser] = useState([]);

  useEffect(() => {
    fetch(`/api.json`)
      .then(res => res.json())
      .then(data => SetUser(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto p-4">
      {users.map(data => (
        <ShowCart key={data.id} data={data} />
      ))}
    </div>
  );
};

export default Cart;
git