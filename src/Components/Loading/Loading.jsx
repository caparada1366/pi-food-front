import React from 'react'
import loading from './giphy.gif'

export default function Loading() {
  return (
    <div><img src= {loading} alt='Loading'/>
    <h1>CARGANDO</h1>
    </div>
  )
}
