import React,{useContext, useState,useEffect} from 'react' 
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/auth_Context'

const Register = props => {
    // const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {Register,isAuthenticated} = authContext;
    useEffect(()=>{
if(isAuthenticated){
    props.history.push('/')
}
    },[isAuthenticated,props.history])

    // const {setAlert} = alertContext;
  const [user,setUser] = useState({
      name:'',
      email:'',
      password:'',
      password2:''
  });
  
  const {name,email,password,password2} = user;

  const onChange = (e) => {
      setUser({...user,[e.target.name] : e.target.value})
  }

  const onSubmit = (e) => {
e.preventDefault();
if(name==='' || email==='' || password === '' || password2 ===''){
// setAlert('Please enter all fields.','danger')
alert('Please enter all fields.')
}
else if(password !== password2){
    // setAlert('Password has not match.','danger')
alert('Password has not match.')
}
else{
Register({
    name,
    email,
    password
})
}
  }
    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={name} onChange={onChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={onChange} minLength='6'
                required />
            </div>
            <div className='form-group'>
                <label htmlFor='name'>Confrim Password</label>
                <input type='password' name='password2' value={password2} onChange={onChange} minLength='6'
                required />
            </div>
            <div>
                <input type='submit' value='Register' className='btn btn-dark'/>
            </div>
            </form>
        </div>
    )
}
 

export default Register
