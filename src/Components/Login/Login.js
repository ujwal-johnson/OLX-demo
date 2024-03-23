import React, { useState, useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({});
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const handleLogin =(e) =>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  
  }
  return (
    <div>
      <div className="loginParentDiv">
      <h2>login-Page</h2>
        <img width="250px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />    
          {errors.email && <p className="error">{errors.email}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
      history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
