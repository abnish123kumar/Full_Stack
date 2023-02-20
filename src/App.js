
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import Summary from './Summary';
import { FaEyeSlash, FaEye } from "react-icons/fa";

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [sign, setSignup] = useState(false);
  const [signin, setSignin] = useState(true);
  const [sumrr, setsummr] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const signUp = () => {
    setSignup(true);
    setSignin(false);
  }
  const register = (e) => {
    alert("Sign up completed");
    setSignin(true);
    setSignup(false);
    Axios.post("http://localhost:4000/register",
      {
        email: email,
        password: pass
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const loginSign = () => {

    Axios.get("http://localhost:4000")
      .then(response => {
        console.log(response.data);
        const arr = [...response.data];
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i].email;
          const ps = arr[i].password;
          console.log(email);
          console.log(el === email);
          if (el === email && ps === pass) {
            console.log(el);
            setSignin(false);
            setsummr(true);
            console.log("hero");
            break;
          } else {
            setError(true);
          }
        }
      }).catch(error => {
        console.log(error);
      })

  }
  const showPassWord = (e) => {
    setShow(!show);
  }
  return (
    <>
      <div className="App">
        {signin ? <div> {error ? <><p className='error'>*Invalid email && password</p><br></br></> : null}
          <input type="email" placeholder='email' required onChange={(e) => setEmail(e.target.value)} /> <br></br><br></br>
          <div className='hide'>{show ? <input type="text" placeholder='password' required onChange={(e) => setPass(e.target.value)} /> : <input type="password" placeholder='password' required onChange={(e) => setPass(e.target.value)} />} <div onClick={(e) => showPassWord(e)}>{show ? <FaEye /> : <FaEyeSlash />}</div></div>  <br></br><br></br>
          <input type="button" className='btn' value="Sign In" onClick={(e) => loginSign(e)} />
          <h2 className='effect' onClick={() => signUp()}>New Users?</h2>
        </div>
          : null}
        {
          sign ? <div>
            <input type="email" placeholder='email' required onChange={(e) => setEmail(e.target.value)} /> <br></br><br></br>
            <input type="password" placeholder='password' required onChange={(e) => setPass(e.target.value)} /> <br></br><br></br>
            {/* <input type="password" placeholder='re-password' /> <br></br><br></br> */}
            <input type="button" className='btn' onClick={(e) => register(e)} value="Sign Up" />
          </div> : null
        }

        {sumrr ? <Summary /> : null}

      </div>

    </>
  );
}

export default App;
