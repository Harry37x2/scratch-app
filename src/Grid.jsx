import React from 'react'
import GridElement from './GridElement'

const Grid = ({scratches, modalOpen, setModalOpen, setHandleId, handleId, handleLike}) => {
  return (
    <div className='grid'>
        {scratches.map((scratch)=>(
            <GridElement 
                key={scratch.id}
                scratch={scratch}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setHandleId={setHandleId}
                handleId={handleId}
                handleLike={handleLike}
            />
        ))}        
    </div>
  )
}

export default Grid