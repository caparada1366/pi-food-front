import React from 'react'
import './Cards.css'
import { Link } from 'react-router-dom'

export default function Cards({image, name, diets, id}) {
  return (
    <Link to={`/detail/${id}`}>
    <div className='cards'>
      <h2>Nombre: {name}</h2>
      <img className='img' src={image} alt={name} style={{width: '17vw', height:'25vh'}}></img>
      <h3>Dietas: {diets.join(", ")}</h3>
    </div>
    </Link>
  )
}
