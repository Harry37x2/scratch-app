import React from 'react'
import GridElement from './GridElement'
import styles from './userScratches.module.css'

const UserScratches = ({scratches, handleLike}) => {
  return (
    <div className={styles.grid}>
        {scratches.map((scratch)=>(
            <GridElement 
                key={scratch.id}
                scratch={scratch}
                handleLike={handleLike}
                
            />
        ))}        
    </div>
  )
}

export default UserScratches