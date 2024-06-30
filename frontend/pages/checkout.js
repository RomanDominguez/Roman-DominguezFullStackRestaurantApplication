/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import Cart from "../components/cart";

function Checkout() {
  // get app context
  const { isAuthenticated } = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;

  // load stripe to inject into elements components
  const stripePromise = loadStripe("pk_test_51PTcC8068sYNCeUICWl7d1175Acz4Bzxpeo9QX8FpsH0lQJlqLdAcqTLR5qxG0TL0UWwCE5reL3hLmXPFo1DheVc00PIPLP677");

  return (
    <Row>
      <Col style={{ paddingRight: 20, 
                    backgroundColor:"gray", 
                    borderRadius: "6px",
                    border: "10px solid darkred",
                    boxShadow: "0 0 20px 1px black"}} sm={{ size: 4, order: 10, offset: 2 }}>
      <br></br>
      
        <center><h1 style={{ 
                    color: "white",
                    backgroundColor: "rgb(216, 81, 81)",
                    borderRadius:"6px",
                    border: "2px solid darkred", 
                    boxShadow: "0 0 20px 1px black",}}>Checkout</h1></center>
                    
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 10 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
