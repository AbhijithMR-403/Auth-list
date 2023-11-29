import React from 'react'
import FormField from '../components/auth/FormField'
import "./../style/auth-page/auth.css"

function SignUpPage() {
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
                    
                    <FormField id="typeNameX" type="text" value="Name"/>
                    <FormField id="typeEmailX" type="email" value="Email"/>
                    <FormField id="typePasswordX" type="password" value="Password"/>
                    <FormField id="typeConfirmPasswordX" type="password" value="Confirm Password"/>
        
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
        
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
        
                    </div>
        
                    <div>
                    <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold">Login</a>
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