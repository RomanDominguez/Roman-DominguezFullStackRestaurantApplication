import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";
import AppContext from "./context"
import Link from "next/link"
// we can pass cart data in via props method 
// the alternative is using useContext as below
function Cart() {
  let isAuthenticated = true;
  let {cart,addItem,removeItem} = useContext(AppContext);
  //const [cartA, setCartA] = useState({cart})
  //cart = value.cart;
  //console.log('props:'+ JSON.stringify(value));
  console.log(`in CART: ${JSON.stringify(cart)}`)
  
  //   problem is that cart may not be set
  const router = useRouter();
  //console.log(`Router Path: ${JSON.stringify(router)}`)
  const renderItems = ()=>{
  let {items} = cart;
   console.log(`items: ${JSON.stringify(items)}`)
    if(items && items.length){
      var itemList = cart.items.map((item, index) => {
          if (item.quantity > 0) {
            return (
              <div
                className="items-one"
                style={{ marginBottom: 15 }}
                key={item.id}
              >
                <li key={index}>
                  <span id="item-name">&nbsp; {item.attributes.name}</span>
                  <span id="item-price">&nbsp; ${item.attributes.price}</span>    
                </li>
                <br></br>

                <div>
                  <Button
                    style={{
                      height: 25,
                      padding: 0,
                      width: 15,
                      marginRight: 5,
                      marginLeft: 10,
                    }}
                    onClick={() => addItem(item)}
                    color="link"
                  >
                    <Button>+</Button>
                  </Button>
                 &nbsp; &nbsp; &nbsp;
                  <Button
                    style={{
                      height: 25,
                      padding: 0,
                      width: 15,
                      marginRight: 10,
                    }}
                    onClick={() => removeItem(item)}
                    color="link"
                  >
                   <Button>-</Button>
                  </Button> &nbsp;
                  <span style={{ marginLeft: 15 }} id="item-quantity">
                    {item.quantity}x
                  </span>
                </div><br></br>
              </div>
            );
          }
        })
        return itemList;
      }
    else {
        return (<div></div>)
    }
  }
const checkoutItems = ()=>{
  return (
    <div>
      <center><Badge style={{ width: 200, padding: 10, color: "green" }} color="light">
        <h5 style={{ fontWeight: 100, color: "black" }}>Total:</h5>
        <h2>${cart.total}</h2>
      </Badge></center>
          <Link href="/checkout/">
            <center><Button style={{ width: "60%" }} color="danger">
              <a>Order Here</a>
            </Button></center>
          </Link>
    </div>
  )}

// return Cart
  return (
    <div>
      <h1 style={{ backgroundColor:"rgb(216, 81, 81)",
                   border: "2px solid darkred",
                   borderRadius: "6px",
                   boxShadow: "0 0 20px 1px black",
                   color: "white",
                   display:"flex",
      }}> Shopping Cart</h1>
      <Card className="cart" style={{ backgroundColor:"Lightgray",
                            border: "10px solid darkred",
                            borderRadius: "6px",
                            boxShadow: "0 0 20px 1px black",
                            color: "black",
                            display:"flex",}} >
        <CardTitle style={{ margin: 10 }}>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ backgroundColor: "white", padding: 10, borderRadius: "20px", }}>
          <div style={{ marginBottom: 100 }}>
            <small>Items:</small>
          </div>
          <div>
            {renderItems()}
          </div>
          <div>
            {checkoutItems()}
          </div>
          
          {console.log(`Router Path: ${router.asPath}`)}
        </CardBody>
      </Card>
     
    </div>
  );
}
export default Cart;
