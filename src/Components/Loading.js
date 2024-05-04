import React from 'react'
import loader  from '../Assets/loading_dots.gif'

const Loading = () => {
  return (
    <div style={{height: '200px', width:'300px'}}>
        <img style={{width:'50%'}} src={loader} alt='loading-icon'/>
    </div>
  )
}

export default Loading