import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customerpage from './pages/Userpage';
import Employeepage from './pages/Employeepage';
import Adminpage from './pages/Adminpage';
import UpdateBook from './components/UpdateBook';
import Addbook from './components/Addbook';
import Viewcart from './pages/Viewcart';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/customer' element={<Customerpage />} />
          <Route path='/employee' element={<Employeepage />} />
          <Route path='/admin' element={<Adminpage />} />
          <Route path='/updatebook/:id' element={<UpdateBook/>}/>
          <Route path='addbook' element={<Addbook/>}/>
          <Route path='/cart/:id' element={<Viewcart/>}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
