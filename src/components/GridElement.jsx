import React from 'react'
import styles from './gridElement.module.css'
import {FcLikePlaceholder,FcLike} from 'react-icons/fc'

const GridElement = ({scratch, setModalOpen, setHandleId, handleId, handleLike}) => {
  
  return (

    <div 
      className={styles.card}
      key={scratch.id}
    >
      <div 
        // className={scratch.scratchDate ? [[styles["card-image"]],[styles["scratched"]]].join(' ') : styles["card-image"]}
        className={styles["card-image"]} 
        onClick={() => {
            setModalOpen(true);
            setHandleId(scratch.id);
          }}
        style={{
            backgroundImage: scratch.scratchDate ? `url(src/assets/activities/${scratch.id}.png)`:'none'            
          }}
      >
          
      </div>
      <div className={styles["card-text"]}>
        <span className={styles.data}>{scratch.scratchDate ? `${scratch.scratchDate}` : 'data'}</span>
        <h2>{scratch.text}</h2>
        {scratch.liked ? 
        <FcLikePlaceholder/> 
        : 
        <FcLike
          onClick={()=>{    
            setHandleId(scratch.id);         
            handleLike(handleId);
          }}/>}
        
      </div>
      <div className={styles["card-stats"]}>
        <div className={styles.stat}>
          <div className={styles.value}>{scratch.likes}</div>
          <div className={styles.type}>Likes</div>
        </div>
        <div className={`${styles.stat} ${styles.border}`}>
          <div className={styles.value}>{scratch.finished}</div>
          <div className={styles.type}>finished:</div>
        </div>
        {/* <div class="stat">
          <div class="value">21</div>
          <div class="type">comments</div>
        </div> */}
      </div>
    </div>
  )
}

export default GridElement