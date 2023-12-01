import './App.css';
import LoginPage from './container/LoginPage';
import SignUpPage from './container/SignUpPage';
import HelloWorld from './container/HelloWorld';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
      {/* <HelloWorld /> */}
        <Routes>
          <Route path='/' element={<HelloWorld />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
