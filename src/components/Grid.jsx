import React from 'react'
import GridElement from './GridElement'
import styles from './grid.module.css'

const Grid = ({scratches, modalOpen, setModalOpen, setHandleId, handleId, handleLike}) => {
  return (
    <div className={styles.grid}>
        {scratches.map((scratch)=>(
            <GridElement 
                key={scratch.id}
                scratch={scratch}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleId={handleId}
                setHandleId={setHandleId}
                handleLike={handleLike}
                
            />
        ))}        
    </div>
  )
}

export default Grid