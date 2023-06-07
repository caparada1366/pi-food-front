import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  axios  from 'axios';
import './Detail.css'
import Loading from '../Loading/Loading';

export default function Detail() {
  var {id} = useParams();
  
  const[receta, setReceta] = useState({});
  const[loading, setLoading]= useState(true);


  useEffect(()=>{
    setTimeout(()=> {setLoading(false)},2500)
    axios.get(`http://localhost:3001/recipes/${id}`).then(({data})=>{
      if(data){
        setReceta(data)
      } else{
        window.alert(`No hay recetas con el id ${id}`)
      }
    }).catch(err => alert(err.toString()))
  },[])

  function limpiarSummary(){
      var summaryHtml = receta.summary;
    return { __html: summaryHtml}
  }
  return (
      <div className='detail'>
        {loading === true ? <Loading></Loading> :
        <div>   
        <h2>ID: {receta.id}</h2>
        <h2>Name: {receta.name}</h2>
        <h2>Health Score: {receta.health_Score}</h2>
        <h2>Diets: {receta.diets?.join(', ')}</h2>
        <img src={receta.image} alt={receta.name}/>
        <h3>Summary</h3>
        <div style={{textAlign: 'left', justifyContent: 'left'}} dangerouslySetInnerHTML={limpiarSummary()}/>
        <h3>Step by Step</h3>
        <ul style={{textAlign: 'left'}}>
          {receta.stepByStep && receta.stepByStep.map((st)=>{
            return <li>{st}</li>
          })}
        </ul>
        </div>}
      </div>
     
        
     
    
    
  )
}
