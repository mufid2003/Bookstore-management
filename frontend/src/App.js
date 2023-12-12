import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customerpage from './pages/Userpage';
import Employeepage from './pages/Employeepage';
import Adminpage from './pages/Adminpage';
import UpdateBook from './components/UpdateBook';
import Addbook from './components/Addbook';

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

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
