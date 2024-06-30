import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";
 function Dishes({restId}){
  const [restaurantID, setRestaurantID] = useState()
  const {addItem} = useContext(AppContext)
 
  const GET_RESTAURANT_DISHES = gql`
  query {
  dishes {
    data{
      attributes{
      name
      description
        price
        image{
          data{
            attributes{
              url
            }
          }
        }
    }
  }
  }
}
`;

  //console.log(`restaurants = ${restaurantID}`)
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: {id: restId },
  });
  //console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  let dishes = data.dishes;
  console.log(restId);
  if (restId > 0){

    return (
      <>
          {dishes.data.map((res) => (
        
            <Col xs="6" sm="4" style={{ padding:10 }} key={res.id}>
              <Card className="card-frame" style={{ backgroundColor:"rgb(216, 81, 81)",
                                            border: "1px solid darkred",
                                            boxShadow: "0 0 20px 1px black"}}>
                <CardBody><center><strong><u>🍽️ - D I S H - 🍽️</u></strong></center></CardBody>
              </Card>
              <Card style={{backgroundColor:"gray", margin: "0 10px" }}><br></br>
                <CardImg
                  
                  style={{ height: 180, width:"100%" }}
                  src={`http://localhost:1337` + res.attributes.image.data.attributes.url}
                />
                <CardBody style={{ backgroundColor:"gray"}}>
                  <CardTitle style={{ backgroundColor:"lightgray", textAlign: "left", color: "black", borderRadius: "6px"}}><strong>{`Name: `}</strong> {res.attributes.name}
                  </CardTitle>
                  <br></br>
                    <CardText 
                    top={true}
                    style={{ backgroundColor:"lightgray", 
                            textAlign: 'justify', 
                            dsiplay: 'inline-block', 
                            height: 400 
                            }}> <u><strong>{`Description: `}</strong></u> <br></br> 
                            {res.attributes.description}
                    </CardText>
                  <CardText> <u><strong>{`Price: `}</strong></u> ${res.attributes.price}</CardText>
                </CardBody>
                <div className="card-footer">
                  <center><Button 
                  color="primary"
                  onClick = {()=> addItem(res)}
                  >
                    + Add To Cart
                  </Button></center>
                </div>
              </Card>
            </Col>
          ))}
        </>
        )}
        else{
          return <h1> No Dishes</h1>
        }
    }
    export default Dishes;