// src/CheckOutPage/CheckOutPage.js
import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import "./checkoutpage.css";
export default function CheckOutPage() {
  const { cart } = useContext(CartContext);

  // Calculate the total price of items in the cart
  const totalBill = cart.reduce((total, item) => total + item.Price, 0);

  return (
    <div>
      {cart.length === 0 ? (
        <div>
          <h1>Check Out Page</h1>
          <p>Your Cart Is Empty</p>
        </div>
      ) : (
        <div className="main-container">
          <div>
            <h1>Check Out Page</h1>
            <ul>
              {cart.map(({ _id, VegitableName, Price, imageUrl }) => (
                <li key={_id} style={{ paddingBottom: "30px" }}>
                  <img src={imageUrl} alt={VegitableName} width="150" />
                  <p className="v-name">{VegitableName}</p>
                  <p className="v-price">Price: ${Price}</p>
                </li>
              ))}
              <h2>Total Bill: ${totalBill.toFixed(2)}</h2>{" "}
            </ul>
          </div>
          {/* Display the total bill */}
        </div>
      )}
    </div>
  );
}
