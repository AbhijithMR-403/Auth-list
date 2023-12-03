import './App.css';
import LoginPage from './container/LoginPage';
import SignUpPage from './container/SignUpPage';
import HelloWorld from './container/HelloWorld';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './redux/store';
import AdminLogin from './container/admin/AdminLogin';
import ProtectedRoute from './container/admin/ProtectedRoute';
import AdminHome from './container/admin/AdminHome';
import ProtectedRouteAdmin from './container/admin/ProtectedRouteAdmin';

function App() {
  return (
    <div className="App">
      <Router>
      {/* <HelloWorld /> */}
      <Provider store={store}>

        <Routes>
          <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HelloWorld />}/>
          </Route>
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route element={< ProtectedRouteAdmin />} >
          <Route path='/adminpage' element={<AdminHome />}/>
          </Route>
        </Routes>
      </Provider>
      </Router>
    </div>
  );
}

export default App;
