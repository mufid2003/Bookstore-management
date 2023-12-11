import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        
      <BrowserRouter>
      <Header/>
      <Routes>
      {/* <Route path="/login" render={(props) => <Login {...props} history={props.history} />} /> */}
      <Route path='/login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
