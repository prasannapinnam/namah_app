import React, { useEffect,useState } from 'react';
import { Routes, Route,useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import About from './components/About';
import AboutTheatres from './components/AboutTheatres';
import FilmSchool from './components/FilmSchool';
import MovieForm from './components/MovieForm';
import Logout from './components/logout';
import 'react-toastify/dist/ReactToastify.css';
import AccessDenied from './components/AccessDenied';
import MyProfile from './components/myProfile';

import './App.css';


const LazyMovies = React.lazy(()=>import('./components/Movies'));

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try{ 
      const jwt = localStorage.getItem("token");
      const userdetails= jwtDecode(jwt);
      setUser(userdetails);
    }
    catch(ex){}
   
  }, []);

  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

//protected routing
  function RequireAuth() {
    if (!isAdmin) {
      window.location = "/access-denied";     
      return;
    }
    return <MovieForm/>;
  }
function AccessMovies(){
  if(localStorage.getItem("token"))
    return <LazyMovies userpath={user}/>

  return <Login/>
}


  return (
    <>
      <ToastContainer />
      <NavBar userpath={user}/>
      <Routes>
          <Route path="movies" element={<React.Suspense fallback='...loading'><AccessMovies/></React.Suspense>}/>
          <Route path="movies/:id" element={<RequireAuth/>}/>
          <Route path="access-denied" element={<AccessDenied/>}/>
          <Route path="login" element={<Login />}/>
          <Route path="logout" element={<Logout />}/>
          <Route path="register-form" element={<RegisterForm />}/>
          <Route path="myProfile" element={<MyProfile userpath={user} />}/>
          <Route path="about" element={<About />}>
            <Route index element={<AboutTheatres/>}/>
            <Route path="namah_theatres" element={<AboutTheatres />}/>
            <Route path="namah_filmschool" element={<FilmSchool />}/> 
          </Route>
          <Route path="/" element={<HomePage userpath={user} />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
      </Routes>  
    </>);
}

export default App;
