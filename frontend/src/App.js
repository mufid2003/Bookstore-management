import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customerpage from './pages/Userpage';
import Employeepage from './pages/Employeepage';
import Adminpage from './pages/Adminpage';

function App() {
  return (
    <div className="App">
        
      <BrowserRouter>
      <Header/>
      <Routes>
      {/* <Route path="/login" render={(props) => <Login {...props} history={props.history} />} /> */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/customer' element={<Customerpage/>}/>
      <Route path='/employee' element={<Employeepage/>}/>
      <Route path='/admin' element={<Adminpage/>}/>

      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
