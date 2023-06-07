import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextPage, prevPage, irPage } from '../../Redux/actions';
import './Paginado.css'

export default function Paginado({cantPages}) {
    const {pagActual} = useSelector((state)=>state);
    const dispatch = useDispatch();

    function nextP(){
        dispatch(nextPage());
    }

    function prevP(){
        dispatch(prevPage());
    }

    function irPag(p){
      dispatch(irPage(p))
      
    }

  return (
    
      <div className='paginado'>
          {pagActual > 1 ? (
          <div>
            <button className='item' onClick={prevP}>PREV</button>
            {pagActual>2 ?(
               <a className='item' onClick={()=>irPag(pagActual-2)}>  {pagActual -2}  </a>
            ):null}
            <a onClick={()=>irPag(pagActual-1)}>  {pagActual -1}  </a>
            
          </div>
        ) : null}
        <div>
        <a className='item' style={{color: 'red'}} onClick={()=>irPag(pagActual)}>  {pagActual}  </a>
        </div>
        {pagActual < cantPages ? (
          <div>
            <div>
            <a className='item' onClick={()=>irPag(pagActual+1)}>  {pagActual +1}  </a>
            {pagActual< cantPages-1 ?(
               <a  className='item'onClick={()=>irPag(pagActual+2)}>  {pagActual +2}  </a>
            ):null}
            <button className='item' onClick={nextP}>NEXT</button>
            </div>
          </div>
        ) : null}
      </div>
    
  )
}
