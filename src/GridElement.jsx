import React from 'react'

const GridElement = ({scratch, setModalOpen, setHandleId}) => {
  
  return (
    <div 
        className='gridElement'
        key={scratch.id}
    > {scratch.text}
        <button 
          className='scratchButton'
          onClick={() => {
            setModalOpen(true);
            setHandleId(scratch.id)
          }}
        >Scratch!</button>
        
    </div>
  )
}

export default GridElement