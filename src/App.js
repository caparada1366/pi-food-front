import './App.css';
import NavBar from './Components/NavBar/NavBar';
import LandingP from './Components/LandingPage/LandingP'
import CardContainer from './Components/CardContainer/CardContainer'
import FormCreateRecipe from './Components/FormCrearReceta/FormCrearReceta'
import Detail from './Components/Detail/Detail';
import {useLocation, Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, getDiets } from './Redux/actions';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(()=>{
    dispatch(getRecipes())
    dispatch(getDiets());
  },[])

  
  function onClick(){
    navigate('/home')
  }

  return (
    <div className="App">
     {location.pathname === '/' ? <LandingP onClick={onClick}></LandingP> : <NavBar></NavBar>}
     <Routes>
      <Route path='/home' element={<CardContainer/>}></Route>
      <Route path='/form' element={<FormCreateRecipe/>}></Route>
      <Route path='/detail/:id' element={<Detail/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
