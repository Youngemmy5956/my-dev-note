import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

 
// function ProtectedRoutes({children}){
//   return(
//     <Route
//     render={()=>{
//       return localStorage.getItem("token") ? children : <Login/>
//     }}
//     />
//   )
// }


function ProtectedRoutes({children}){
  const isAuthenticated = JSON.parse(localStorage.getItem("token"));
  
  if(isAuthenticated){
    return <Navigate to="/login" replace />;
  }
  return children;
}


function App() {
  return (
    <div >
      <BrowserRouter>

      <Routes>
        <Route path="/" element ={ <ProtectedRoutes><Home /></ProtectedRoutes>}  />
        <Route path="/signup" element ={ <Signup />}  />
        <Route path="/login" element ={ <Login />}  />
        <Route path="/" element ={ <Home />}  />




      </Routes>
      
      
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
