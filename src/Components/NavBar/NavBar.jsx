import React from 'react'
import SearchBar from './SearchBar'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='navbar'>
        <Link to='/home'><button>Home</button></Link>
        <SearchBar></SearchBar>
        <Link to='/form'><button>Crear receta</button></Link>
     
    </div>
  )
}
