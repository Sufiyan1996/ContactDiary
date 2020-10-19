import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
import Home from './components/pages/Home' 
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ContactState from './context/ContactState' 
import AuthState from './context/auth/Auth_State'
import AlertState from './context/alert/AlertState'
import SetAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'

import './App.css'; 
 
  SetAuthToken(localStorage.token);
const App = () => { 
  return (
    <AuthState>
    <ContactState>
      {/* <AlertState> */}
    <Router>
     <Fragment>
       <Navbar />
       <div className='container'>
         <Switch>
           {/* <Alert /> */}
           <PrivateRoute exact path='/' component={Home} />
           <Route exact path='/about' component={About} />
           <Route exact path='/register' component={Register} />
           <Route exact path='/login' component={Login} />
         </Switch>
       </div>
     </Fragment>
     </Router>
     {/* </AlertState> */}
     </ContactState>
     </AuthState>
  );
};

export default App;
