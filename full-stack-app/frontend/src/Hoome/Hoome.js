import React, { useContext, useEffect, useState } from "react";
import "./Hoome.css";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../CartContext/CartContext";
export default function Home() {
  const [vegetables, setVegetables] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchVegetableDetails = async () => {
      try {
        console.log("Fetching vegetable details...");
        const response = await fetch("http://localhost:3820/getAllVegetables");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse JSON response
        setVegetables(data); // Set parsed JSON data into state
      } catch (error) {
        console.error("Error fetching vegetables:", error);
        setError(error.message || "Unknown error");
      }
    };
    fetchVegetableDetails();
  }, []);

  const navigateToCheckOutPage = () => {
    navigate("/checkout");
  };
  const handleAddToCart = (vegetable) => {
    addToCart(vegetable);
  };

  return (
    <div style={{ color: "white" }}>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="Unlist">
          <ul>
            <div>
              <h1 style={{ color: "black" }}>Vegitable Home Page</h1>
              <button onClick={navigateToCheckOutPage}>CheckOutPage</button>
            </div>
            {vegetables.map(({ _id, VegitableName, imageUrl, Price }) => (
              <li key={_id} className="list-css">
                <img
                  className="image-css"
                  src={imageUrl}
                  alt={VegitableName}
                  width="100"
                />
                <p className="vegitable-name">{VegitableName}</p>
                <p className="vegitable-price">
                  Price: <span style={{ fontWeight: "700" }}>${Price}</span>
                </p>
                <button
                  onClick={() =>
                    handleAddToCart({ _id, VegitableName, imageUrl, Price })
                  }
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
