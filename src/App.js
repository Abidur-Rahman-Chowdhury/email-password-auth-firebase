import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const handelEmailBlur = (event) => {
    setEmail(event.target.value);
    event.target.value = '';
  };
  const handelPasswordBlur = (event) => {
    setPassword(event.target.value);
    event.target.value = '';
  };
  const handelFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    }

    setValidated(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
    })
    console.log("form submited");
    event.preventDefault();
  };
  return (
    <div >
      <div className="w-50 mx-auto border border-3 rounded-5 mt-5 p-4">
        <h2 className="text-primary">Please Register!!</h2>
        <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
