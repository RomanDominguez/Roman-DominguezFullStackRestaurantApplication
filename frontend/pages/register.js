/* /pages/register.js */

import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../components/auth";
import AppContext from "../components/context";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });//initial information for the form register
  const [loading, setLoading] = useState(false);//Used for fieldset tag with disabled attribute so the fields in form will be set disabled again once submit button is pressed
  const [error, setError] = useState({});//empty object as default value because no erros at begginig
  const appContext = useContext(AppContext);//This information is coming from context where is the values of createContext
  return (
          
    <Container>

      <Row>
      
        <Col sm="12" md={{ size: 5, offset: 3 }}>

          <div className="paper">

            <div className="header">

              <center><h3>Register Page</h3></center>
             
              <center><img src="http://localhost:1337/uploads/restaurants_e50ba9194f.png" width="150" /></center>
            </div>

            <section className="wrapper">

          {Object.entries(error).length !== 0 &&
            error.constructor === Object &&
            <div key={error.error.name} style={{marginBottom: 10}}>
                      <small style={{color: "red"}}>
                              {error.error.message}
                      </small>

            </div>
            }

              <Form>
                <fieldset disabled={loading}>
                  
                  <FormGroup>
                    <Label><strong>Username:</strong></Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label><strong>Email:</strong></Label>
                    <Input
                      onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label><strong>Password:</strong></Label>
                    <Input
                      onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 100, }}
                      color="danger"
                      disabled={loading}
                      onClick={() => {
                        setLoading(true);
                        registerUser(data.username, data.email, data.password)
                          .then((res) => {
                            // set authed user in global context object
                            appContext.setUser(res.data.user);//this information is set from AppContext
                            
                            setLoading(false);
                            //console.log(`data: ${JSON.stringify(res.data.user.username)}`)
                            console.log(`username: ${JSON.stringify(res.data.user.username)}`)
                            console.log(`appcontext: ${JSON.stringify(appContext)}`)
                          })
                          .catch((error) => {
                            console.log(`error in register: ${error}`)//This is returned from object.entries if an error occurs during registration
                            setError(error.response.data);//This is the value of an error set when it occurs 
                            setLoading(false);//This value is set from fieldset tag with disabled attribute
                          });
                         
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
           
          </div>
     
        </Col>
        
      </Row>
     
      <style jsx>
        {`
          .paper {
            border: 1px solid black;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
             box-shadow: 0 0 20px 1px black;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: rgb(216, 81, 81);
            margin-bottom: 30px;
            
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            border: 3px solid #ddd;
            margin: 6px 30px 10px 30px;
            border-radius: 8px;
          }
            img:hover {
            box-shadow: 0 0 20px 1px black;
          }

        `}
      </style>
    </Container>
    
  );
};
export default Register;
