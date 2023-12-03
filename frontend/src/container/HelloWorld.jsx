import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../constant/constant';
import { set_Authentication } from '../redux/authentication/authenticationSlice';

function HelloWorld() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');
  const authentication_user = useSelector(state => state.authentication_user)
  const [userdata, setuserdata]= useState([])
  const logout = ()=>{
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin:false
      })
    );
    navigate('/login')
  }

  const [userUpdateDetails, setUserUpdateDetails] = useState({
    image:null
  })
  useEffect(() => {
    console.log("am i here you \nn\n\n",authentication_user.email);
    axios.post('http://localhost:8000/hello-world',{
      email: authentication_user.email
    })
      .then(response => {
        console.log(Object.values(response.data));
        setuserdata(response.data)
        // setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userUpdateDetails]);


  const handleImageChange = (e) => {
    setUserUpdateDetails({
      image: e.target.files[0]
    })
  };



  // Sent it to back end 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userUpdateDetails);
    let form_data = new FormData();
    form_data.append('profile_pic', userUpdateDetails.image, userUpdateDetails.image.name);
    let url = baseURL+'/update';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`,
      }
    })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
  }
  
  return (
    <div>

      <section class="vh-100" style={{backgroundColor: "#eee"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-4">

        <div class="card" style={{borderRadius: "15px"}}>
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img src={userdata.profile_pic?userdata.profile_pic:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"}
                class="rounded-circle img-fluid" style={{width: "100px"}}/>
            </div>
            <h4 class="mb-2">{authentication_user.isAuthenticated?<>Welcome Back <br /> {authentication_user.name} ! </>:<>Hello Guest User</>}</h4>
            
            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>

            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg" className='form-control my-2'  onChange={handleImageChange} required/>

            <button type="submit" className="btn btn-primary btn-rounded btn-lg">
              Update Profile Pic
            </button>


            </form>
            <br />
            <button type="button" class="btn btn-primary btn-rounded btn-lg" onClick={logout}>
              Logout
            </button>
            
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;