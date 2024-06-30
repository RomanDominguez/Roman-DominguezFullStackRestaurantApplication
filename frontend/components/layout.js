/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import AppContext from "./context";
import Script from "next/script";
import Footer from "./Footer";

const Layout = (props) => {
const title = "RESTAURANT APP";
const {user} = useContext(AppContext);
  return (
    <div >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <Script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: lightgreen;
              padding-top: 11px;
            }
             
          `}
        </style>
        <Nav justified className="navbar navbar-dark bg-danger" >
          <NavItem  style={{ 
                    backgroundColor: "rgb(216, 81, 81)",
                    borderRadius:"6px",
                    border: "2px solid darkred", 
                    boxShadow: "0 0 20px 1px black",}}>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          
          <NavItem className="ml-auto" style={{ 
                    backgroundColor: "rgb(216, 81, 81)",
                    borderRadius:"6px",
                    border: "2px solid darkred", 
                    boxShadow: "0 0 20px 1px black"}}>
            {user ? (<h5 style={{ textTransform: "uppercase", color: "lightgreen" }}> "<u>{user.username}</u>"</h5>) : (<Link href="/register"><a className="nav-link"> Sign up</a></Link>)}
          </NavItem>
          
          <NavItem style={{ 
                    backgroundColor: "rgb(216, 81, 81)",
                    borderRadius:"6px",
                    border: "2px solid darkred",
                    boxShadow: "0 0 20px 1px black" }}>
            {user ? (<Link href="/"><a className="nav-link" onClick={() => {logout(); setUser(null); }}>Logout</a></Link>) : (user ? ((<h5>"Welcome: {user.username}"</h5>)) : (<Link href="/login"><a className="nav-link">Sign in</a></Link>))}
          </NavItem>

        </Nav>
      </header>
      <Container>{props.children}</Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
    </div>
  );
};

export default Layout;