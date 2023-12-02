import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import FormField from '../components/auth/FormField'
import { baseURL } from '../constant/constant'
import "./../style/auth-page/auth.css"

function SignUpPage() {
    const [formError, setFormError] = useState([])
  const navigate = useNavigate();

 const handleRegisterSubmit = async (event)=>{
    event.preventDefault();
    setFormError([])
    if (event.target.password.value !== event.target.confirm_password.value)
    return setFormError(['Password and Confirm Password must be same'])
    const formData = new FormData();
    formData.append("first_name", event.target.first_name.value);
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    formData.append("last_name", event.target.last_name.value);
    try {
        const res = await axios.post(baseURL+'/register', formData)
        console.log("auhsdfjklds",res);
        if(res.status === 201){
        navigate('/login',
        {
            state:res.data.Message
        })
        return res
        }  
    }
    catch (error) {
        console.log(error.response.data)
        setFormError(error.response.data)
        
        console.log(error);
        
    }
    }
  return (
    <div>
        <section className="vh-90 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white auth-card-css">
                <div className="card-body p-5 text-center">
        
                    <div className="mb-md-4 mt-md-4 pb-5">
        
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-white-50 mb-5">Please enter your details!</p>
                    <form onSubmit={handleRegisterSubmit} method='POST'>
                    <FormField id="typeFNameX" type="text" value="First Name" name="first_name"/>
                    <FormField id="typeLNameX" type="text" value="Last Name" name="last_name"/>
                    <FormField id="typeEmailX" type="email" value="Email" name="email" />
                    <FormField id="typePasswordX" type="password" value="Password" name="password"/>
                    <FormField id="typeConfirmPasswordX" type="password" value="Confirm Password" name="confirm_password" />
        
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
                    </form>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
        
                    </div>
                    <ul className='text-danger'>
              {formError.map((key,index) => {
                console.log("wha is thsis\n\n\n\n",formError);
                console.log(key)
                return <li key={{index}}>{key}</li>
                // (
                // formError[key].map((message, index) => (
                //   <li key={`${key}_${index}`}>{message}</li>
                // )))
              })}
            </ul>
                    <div>
                    <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold"> <Link to={'/login'}>Login</Link></a>
                    </p>
                    </div>
        
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default SignUpPage