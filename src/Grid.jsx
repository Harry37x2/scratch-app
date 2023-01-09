import React from 'react'
import GridElement from './GridElement'
import BigCart from './BigCart'

const Grid = ({scratches, modalOpen, setModalOpen, setHandleId}) => {
  return (
    <div className='grid'>
        {scratches.map((scratch)=>(
            <GridElement 
                key={scratch.id}
                scratch={scratch}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setHandleId={setHandleId}
            />
        ))}        
    </div>
  )
}

export default Grid