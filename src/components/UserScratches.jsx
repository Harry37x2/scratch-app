import React from 'react'
import GridElement from './GridElement'
import styles from './userScratches.module.css'

const UserScratches = ({scratches, setHandleId, handleLike}) => {
  return (
    <div className={styles.grid}>
        {scratches.map((scratch)=>(
            <GridElement 
                key={scratch.id}
                scratch={scratch}
                setHandleId={setHandleId}
                handleLike={handleLike}
                
            />
        ))}        
    </div>
  )
}

export default UserScratches