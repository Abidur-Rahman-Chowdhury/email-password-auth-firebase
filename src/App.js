import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);

  const handelEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handelNameBlur = (event) => {
    setName(event.target.value)
  }
  const handelPasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handelRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };
  const handelPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
      console.log('email sent');
    })
  }
  const handelFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error('error', error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail(" ");
          setPassword(" ");
          verifyEmail();
          setUserName();

        })
        .catch((error) => {
          console.error("error", error);
          setError(error.message);
        });
    }

    console.log("form submited");
    event.preventDefault();
  };
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name 
    })
      .then(() => {
      console.log('updating name');
      })
      .catch(error => {
       setError (error.message)
    })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
      console.log('email verification send');
    })
  }
  return (
    <div>
      <div className="w-50 mx-auto border border-3 rounded-5 mt-5 p-4">
        {registered ? (
          <h2 className="text-primary">Please Login!!</h2>
        ) : (
          <h2 className="text-primary">Please Registered!!</h2>
        )}
        <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
         { !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Your Name</Form.Label>
            <Form.Control
              onBlur={handelNameBlur}
              type="text"
              placeholder="Enter Your Name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Your name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handelEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handelPasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handelRegisteredChange}
              type="checkbox"
              label="Already registered?"
            />
          </Form.Group>
          <Button onClick={handelPasswordReset} variant="link">Forget Password?</Button> <br />

          <Button variant="primary" type="submit">
            {
              registered ? 'Login' : 'Submit'
            }
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
