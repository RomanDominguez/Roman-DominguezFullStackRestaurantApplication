import {gql,useQuery} from '@apollo/client';
import Dishes from "./dishes"
import {useContext, useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col} from "reactstrap";

function RestaurantList(props){
  const[restaurantID, setRestaurantID] = useState(0)
  const {cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
    query Restaurant {
      restaurants {
        data {
          id
          attributes {
            Name
            Description
            Image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR </p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)


let searchQuery = data.restaurants.data.filter((res) =>{
    return res.attributes.Name.toLowerCase().includes(props.search)
  })

  let restId = searchQuery[0].id
  const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };

  if(searchQuery.length > 0){
    const restList = searchQuery.map((res) => (
    <Col xs="6" sm="4" key={res.id}>
<br></br>
      <Card className="card-frame" style={{ backgroundColor:"rgb(216, 81, 81)",
                                            border: "1px solid darkred",
                                            boxShadow: "0 0 20px 1px black"
      }}>
        <CardBody style={ {borderRadius: "6px"}}><center><strong>🧑🏽‍🍳 - R E S T A U R A N T - 👩🏽‍🍳</strong></center>
        <strong><center><u>{res.attributes.Name}</u></center></strong></CardBody>
        </Card>
        
        <Card style={{ backgroundColor:"gray", margin: "0 0.5rem 20px 0.5rem", borderRadius: "6px" }}>
        <CardImg
          top={true}
          style={{ height: 300 }}
          src={
          `http://localhost:1337`+ res.attributes.Image.data.attributes.url
          }
        />

        <CardBody>
          <CardTitle><strong><u>Description:</u></strong></CardTitle>
          <CardText 
          top={true}
          style={{backgroundColor:"lightgray", height: 'fit-content' }}>
          {res.attributes.Description}
          </CardText>
        </CardBody>
        
        <div className="card-footer">
          <center>
            <Button 
             color="danger" 
             onClick={()=> setRestaurantID(res.id)}
             >Go to Dishes
            </Button>
          </center>
        </div>
      </Card>
    </Col>
  ))

  return(

    <center>
    <Container style={{backgroundColor:"lightgray",
                       borderRadius: "6px",
                       border: "10px solid darkred",
                      
    }}>
    <Row xs='3' style={{display:"flex", justifyContent: "center"}}>
      {restList}
    </Row>
  
    <Row xs='3'>
    {renderDishes(restaurantID)}
    </Row>
 
    </Container></center>
 
  )
} else {
  return <h1> No Restaurants Found</h1>
}
}
   export default RestaurantList