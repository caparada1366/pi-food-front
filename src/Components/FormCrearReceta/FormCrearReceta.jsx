import React, { useState } from 'react'
import validation from './validation'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../Redux/actions'
import './FormCrearReceta.css'


export default function FormCrearReceta() {
  const dispatch = useDispatch()
  const {diets} = useSelector((state)=>state)

  const [receta, setReceta]=useState({
    name: "",
    summary: "",
    health_Score: "",
    image: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    summary:"",
    health_Score: "",
    image: "",
    steps:""
  })

  const [pasos, setPasos]= useState([]);
  const [inputPaso, setInputPaso]=useState("");

  const [selectedDiets, setSelectedDiets]= useState([]);

  function handleChangeDiets(e){
    const{name, checked} = e.target;
    if(checked){
      setSelectedDiets([...selectedDiets, name])
    }else{
      setSelectedDiets(selectedDiets.filter(valor => valor !== name))
    }
  }

  function handleChangePaso(e){
    setInputPaso(e.target.value)
  }

  function handleSubmitPaso(e){
    e.preventDefault();
    const confirmar = window.confirm('¿Está seguro que la información del paso de la receta es correcta?')
    if(confirmar){
    setPasos([...pasos, inputPaso])
    setInputPaso("")
    }
  }

  function handleChange(e){
    setReceta({
      ...receta,
      [e.target.name]: e.target.value
    })
    setErrors(validation({
      ...receta,
      [e.target.name]: e.target.value,
    }, pasos))
  }

  async function  handleSubmitForm(e){
    e.preventDefault();
    var errores = Object.values(errors)
    if(pasos.length < 1 ){
      alert('Debe ingresar al menos un paso')
    }else if(errores.length >0 ){
      alert(errores.join(', '))
    }
    else{
      try{
      const datos = {
        name: receta.name,
        image: receta.image,
        summary: receta.summary,
        health_Score: receta.health_Score,
        stepByStep: pasos,
        diets: selectedDiets
      }
      await axios.post('http://localhost:3001/recipes',datos)
        alert('Receta creada')
        setReceta({ name: "",
        summary: "",
        health_Score: "",
        image: "",});
        setPasos([]);
        setSelectedDiets([]);
        dispatch(getRecipes())
      }catch(err){
        alert(err.message)
      }
     
    }
  }

  async function testPost(){
    try{}
    catch(err){
      alert(err.message)
    }
    
  }

  return (
    
    <div className='formCrearReceta'>
      <form className='form'>
        <div><label>Nombre: </label><input name='name' value={receta.name} onChange={handleChange}/>
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}</div>
        <div><label>Imagen url: </label><input name='image' value={receta.image} onChange={handleChange}/>
        {errors.image && <p style={{color: 'red'}}>{errors.image}</p>}</div>
        <div><label>Health Score: </label><input name='health_Score' value={receta.health_Score} onChange={handleChange}/>
        {errors.health_Score && <p style={{color: 'red'}}>{errors.health_Score}</p>}</div>
        <div><label>Resumen: </label><textarea style ={{width: '300px', height: '50px'}} name='summary' value={receta.summary} onChange={handleChange}/>
        {errors.summary && <p style={{color: 'red'}}>{errors.summary}</p>}</div>
        <div style={{marginLeft: '6vw', marginRight: '6vw'}}>
          <label>Dietas: </label>
          {diets && diets.map((diet)=>{
            return <label><input type='checkbox' style={{cursor: 'pointer'}} name={diet.name} checked={selectedDiets.includes(diet.name)} onChange={handleChangeDiets}/>{diet.name} </label>
          })}
        </div>
        <div className='contenedorPasos'>
          <div className='leftf-div'><label>Paso: </label><textarea style ={{width: '500px', height: '75px'}}name='paso' value={inputPaso} onChange={handleChangePaso}/>
          {errors.steps && <p style={{color: 'red'}}>{errors.steps}</p>}
          <button className='button' onClick={handleSubmitPaso} style={{cursor: 'pointer'}}>Añadir paso</button></div>
          
          <div className='rightf-div'>
          <b>Pasos añadidos:</b>
          <ol style={{backgroundColor: 'rgba(168, 190, 190, 0.301)', fontWeight: 'bold'}}>
          {pasos && pasos.map((st)=>{
              return <li>{st}</li>
            })}
          </ol>
        </div>
      </div>
      <button className='button' type='submit' onClick={handleSubmitForm} style={{cursor: 'pointer'}}>Crear Receta</button>
      </form>
     
    </div>
  )
}
