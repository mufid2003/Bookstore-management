import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customerpage from './pages/Userpage';
import Employeepage from './pages/Employeepage';
import UpdateBook from './components/UpdateBook';
import Addbook from './components/Addbook';
import Viewcart from './pages/Viewcart';
import Adminpage from './pages/Adminpage';
import OrderDetailspage from './pages/OrderDetailspage';
import Landingpage from './pages/Landingpage';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Landingpage/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/customer' element={<Customerpage />} />
          <Route path='/employee' element={<Employeepage />} />
          <Route path='/updatebook/:id' element={<UpdateBook />} />
          <Route path='addbook' element={<Addbook />} />
          <Route path='/cart/:id' element={<Viewcart />} />
          <Route path='/admin' element={<Adminpage />} />
          <Route path='/orders' element={<OrderDetailspage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
