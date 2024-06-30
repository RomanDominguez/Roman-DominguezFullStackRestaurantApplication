import React, { useState } from "react";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { InputGroup, InputGroupAddon, Input} from "reactstrap";
import Link from 'next/link';
import Cart from "../components/cart"
import RestaurantList from '../components/restaurantList';

export default function Home() {

//Here you can use const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"; and use it in:
//const link = new HttpLink({ uri: `${API_URL}/graphql` }) but instead you can use:
    
    const link   = new HttpLink({ uri: 'http://localhost:1337/graphql'});
    const cache  = new InMemoryCache()
    const client = new ApolloClient({ link, cache });
    const [query, setQuery] = useState("");

//This is a test for Routing pages in NextJS
    const restaurants = [
        { name: "Cardenal" },
        { name: "Balcon"   },
        { name: "Pujol"    }
    ]

  
    return (
        <ApolloProvider client={ client } >
          <div className="search">
        <br></br>    
              <center><h1 
              style={{ backgroundColor: "gray", 
              color: "rgb(216, 81, 81)", 
              fontFamily: "Lucida Console, Courier, monospace",
              textShadow: "2px 2px black",
              borderRadius: "6px",
              padding: "10px 30px 20px 30px",
              border: "10px solid darkred",
              boxShadow: "0 0 20px 1px black",
              }}> R e s t a u r a n t s
              </h1></center>
      <br></br>
                <InputGroup  style={{ backgroundColor: "lightgray", 
                                      boxShadow: "0 0 20px 1px black",
              }}>
                    <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                        <Input
                            placeholder= "Looking for a Restaurant?"
                            onChange={(e) =>
                                     setQuery(e.target.value.toLocaleLowerCase())
                                     }
                            value={ query }
                        />
                </InputGroup>
        <br></br>
            </div>
            <RestaurantList search={ query } />    
        <br></br>
            <Cart> </Cart>
            <div>
                <h1>Restaurant List of All Restaurants</h1>
                {restaurants.map( item  => {
            return <div> 
                <Link as={"/restaurants/" + item.name} href="/restaurants/[restaurant]">
                <a>{item.name}</a>
                </Link> 
                </div>
            })} 
                </div>
                <div>
                <h1>Contact Information</h1>
                <Link  href="/restaurants/[contact]">
                        <a>contact me</a>
                </Link>    
                </div> 

                <div>
                <Link  href="/restaurants/[privacy]">
                        <a>Privacy policy</a>
                </Link>    
                </div>


        </ApolloProvider>
        
    );
  }
 
  