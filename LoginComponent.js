import React,{useState} from 'react';
import '../styles/login.css';
import userPng from '../imges/user_icon.png'
import Email from '../imges/logo-gmail.png';
import lock from '../imges/padlock-lock.png';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPasseord] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasseordError] = useState(false);
  const handelChange = (event, name) => {
    
    if(name === 'email') {
      setEmail(event.target.value);
      setEmailError(false);
    } else {
      setPasseord(event.target.value);
      setPasseordError(false);
    }
  }
  const handelSubmit = () => {
  
      if(!email) {
        setEmailError(true);
      } else if(!password) {
        setPasseordError(true);
      }   if(!email && !password) { 
        setEmailError(true);
        setPasseordError(true);
      }
    
  }
  return (
    <div className="App">
      <div className="container">
      <div className="welcomeBackText">
          <div className="body-form">
            <div id="WText" className="textAnimiStyle">
             Welcome
            </div>
            <div id="WText" className="bookText">
             Book you Time slot
            </div>
        </div>
      </div>
        <div className="form-box">
          <div className="body-form">
            <form>
              <img style={{width: '24%'}}src={userPng} alt="logo"/><br/>
              <input type="text" name="email" className="form-control" placeholder="Email address*" onChange={(e) =>handelChange(e,'email')}/>
              <img className="iconImg" src={Email} alt="logo"/>
              {emailError && <p className="customError">Please Enter valid Email</p>}
              <input type="text" name="password" className="form-control" placeholder="Password*" onChange={(e) => handelChange(e,'password')} />
              <img className="iconImg" src={lock} alt="logo"/><br/>
              {passwordError && <p className="customError">The password That you've is entered is incorrect</p>}
              <div><a href="#" color="anchoerText">Forgot your password</a></div>
              <button type="button" className="btn btn-secondary btn-block" onClick={handelSubmit}>LOGIN</button>
              <div><a href="#" color="anchoerText">Sign Up</a></div>
            </form>
          </div>
        </div>
       </div>
        
    </div>
  );
}

export default LoginComponent;
