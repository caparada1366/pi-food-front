import React, {useState} from 'react'
import {filtrarDieta, filtrarOrigen, ordenarAlfa, ordenarHealthScore, quitarFiltros } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import './Filtros.css'

export default function Filtros() {

  const {diets} = useSelector((state)=> state)  
  const dispatch = useDispatch();
  const[selectedDiets, setSelectedDiets] = useState([])

  function handleSortName(e){
    dispatch(ordenarAlfa(e.target.value))
  }

  function handleSortHS(e){
    dispatch(ordenarHealthScore(e.target.value))
  }

  function handleFilterOrigen(e){
    dispatch(filtrarOrigen(e.target.value))
  }

  function handleFilterDiets(e){
    if(selectedDiets.length === 0){
      alert('Seleccione al menos una dieta para filtrar')
    }
    else{
    dispatch(filtrarDieta(selectedDiets))
    }
  }
  
  function handleDietsChange(e){
    const {name, checked} = e.target;
    if(checked){
        setSelectedDiets([...selectedDiets, name])
        
    }else {
        setSelectedDiets(selectedDiets.filter(d=>d!== name))
    }
  
  }
  
  function handleQuitarFiltros(e){
    dispatch(quitarFiltros())
    setSelectedDiets([])
  }


  return (
    <div className='filtros'>
        <div>
        <label for='OrdAZ' style={{alignSelf: 'center'}}>Orden Alfabético</label>
        <div>
        <select onChange={handleSortName} name='Orden Alfabetico' id='OrdAZ'>
          <option value='default'>-</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>
        </div>
        </div>
        <div>
        <label for='OrdHS' style={{alignSelf: 'center'}}>Orden Health Score</label>
        <div>
        <select onChange={handleSortHS} name='Orden Health Score' id='OrdHS'>
            <option value='default'>-</option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
        </select>
        </div>
        </div>
        <div>
        <label for='filOrigen' style={{alignSelf: 'center'}}>Filtrar por origen</label>
        <div>
        <select onChange={handleFilterOrigen} name= 'Filtro Origen' id='FilOri'>
            <option value='Todos'>Todos</option>
            <option value='API'>API</option>
            <option value='DB'>DB</option>
        </select>
        </div>
        </div>
        <div>
            
             
              <div className='contenedorDietas'>
              <label for='filDiets'>Filtrar por dietas: </label>   
                  {diets && diets.map((d)=>{
                      return <label> <input type='checkbox' name={d.name} checked={selectedDiets.includes(d.name)} onChange={handleDietsChange}/>{d.name}</label>
                  })}   
             
            <button onClick={handleFilterDiets}style={{marginLeft: '55px', marginTop: '10px', marginBottom: '10px' }}>Filtrar por dietas</button>
            </div>
        <div style={{alignSelf: 'center', paddingBottom: '200px', paddingRight: '20px', }}>
        <button onClick={handleQuitarFiltros} style={{fontWeight: 'bolder', marginTop: '30px'}}>Quitar filtros</button>
        </div>        
        </div>   
        
    </div>
  )
}
