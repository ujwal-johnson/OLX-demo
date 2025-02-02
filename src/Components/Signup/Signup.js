import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history= useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({});
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit =(e)=>{
    e.preventDefault()
      firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
              history.push("/login")
          })
        })        
      })
      const errors = {};
      if (!username.trim()) {
        errors.username = 'Username is required';
      }
      if (!email.trim()) {
        errors.email = 'Email is required';
      }
      if (!phone.trim()) {
        errors.phone = 'Phone number is required';
      }
      if (!password.trim()) {
        errors.password = 'Password is required';
      }
      setErrors(errors);
  
      if (Object.keys(errors).length === 0) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            result.user
              .updateProfile({ displayName: username })
              .then(() => {
                firebase
                  .firestore()
                  .collection('users')
                  .add({
                    id: result.user.uid,
                    username: username,
                    phone: phone,
                  })
                  .then(() => {
                    history.push('/login');
                  });
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="300px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
      {errors.username && <p className="error">{errors.username}</p>}
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
      {errors.phone && <p className="error">{errors.phone}</p>}
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
          <button>Signup</button>
        </form>
        <a onClick={()=>{
      history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
