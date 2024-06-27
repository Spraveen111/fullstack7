import "./App.css";
import SignUpPage from "./SignUpPage/SignUpPage.js";
import SignInPage from "./SignInPage/SignInPage.js";
import CheckOutPage from "./CheckOutPage/CheckOutPage.js";

import Hoome from "./Hoome/Hoome.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext/CartContext.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/hoome" element={<Hoome />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
