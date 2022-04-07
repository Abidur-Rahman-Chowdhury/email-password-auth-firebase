
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
const auth = getAuth(app);

function App() {

  const handelEmailBlur= (event) => {
    console.log(event.target.value);
  }
  const handelPasswordBlur = (event) => {
    console.log(event.target.value);
  }
  const handelFormSubmit = (event) => {
    console.log('form submited');
    event.preventDefault();
  }
  return (
    <div className="App">
      <form onSubmit={handelFormSubmit}>
        <input onBlur={handelEmailBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handelPasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
     </form>
    </div>
  );
}

export default App;
