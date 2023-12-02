import React,{useState, useEffect} from 'react'
import FormField from '../components/auth/FormField'
import "./../style/auth-page/auth.css"
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../redux/authentication/authenticationSlice'
import { jwtDecode } from 'jwt-decode'

function LoginPage() {
const { state } = useLocation();
  const [message, setmessage] = useState(null)
  const [formError, setFormError] = useState([])
  const baseURL='http://127.0.0.1:8000'

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(state){
      setmessage(state)
    }
    navigate('', {});
  }, [state,navigate])


  const handleLoginSubmit = async(event)=> {
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL+'/login', formData)
      if(res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        console.log(res.data);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin:res.data.isAdmin
          })
        );
        navigate('/')
        return res
      }  
    }
    catch (error) {
      console.log(error);
      if (error.response.status===401)
      {
        setmessage(error.response.data)
        setFormError(error.response.data)
        console.log(error.response.data);
      }
      else
      {
        console.log(error.response.data);
  
      }
    }
  }

  return (
    <div>
        <section className="vh-90 gradient-custom">
    <div className="container p-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
    
                <div className="mb-md-2 mt-md-4 pb-5">
    
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                <form onSubmit={handleLoginSubmit} method="post">

                <FormField id="typeEmailX" type="email" value="Email" name="email" />
                <FormField id="typePasswordX" type="password" value="Password" name="password" />
                
    
                  <a className='text-danger text-decoration-none'>
                    {
                      formError.detail
                    }
                    </a>
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
    
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                </form>

                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                </div>
    
                </div>
    
                <div>
                <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold"> <Link to={'/signup'}>Sign Up</Link> </a>
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

export default LoginPage