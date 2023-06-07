import React from 'react'
import Dinner from './Dinner.jpg'
import './LandingP.css'
import Hamburguesa from './Hamburguesa.jpg'
import Mordida  from './Mordida.jpg'
import cooking from './cooking.png'


export default function LandingP({onClick}) {

  const [hovered, setHovered] = React.useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };
  
  function handleClick(e){
    onClick();
  }
  return (
    <div className='landingP'>
      <div className='header'>
        <h1>HENRY FOODS</h1>
        <img src={cooking} style={{width: '50px', height: '50px'}} alt="cook"/>
      </div>
      <div className='container'>
        <div className='left-div'>
          <h1>¡Bienvenido!</h1>
          <h3>Aquí puedes encontrar información sobre más de 5.000 recetas para que prepares el plato que más te gusta</h3>
          { hovered ? (<img 
                        src={Mordida} alt='Food' 
                        style={{width: '150px', height: '150px', cursor: 'pointer',  borderRadius: '200px'}} 
                        onMouseOut={handleMouseOut}
                        onClick={handleClick}
                        />) :
                      ((<img 
                        src={Hamburguesa} 
                        alt='Food' 
                        style={{width: '150px', height: '150px', cursor: 'pointer',  borderRadius: '200px'}} 
                        onMouseOver={handleMouseOver}/>))
          }
          <h5>Haz click en la hamburguesa para entrar</h5>
        </div>
        <div className='right-div'>
            <img src={Dinner} alt='Food' style={{width: '40vw', height: 'auto'}} ></img>
        </div>
      </div>
    </div>
  )
}
