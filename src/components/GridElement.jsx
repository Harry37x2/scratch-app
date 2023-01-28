import React from 'react'
import styles from './gridElement.module.css'
import {FcLikePlaceholder, FcLike, FcDislike} from 'react-icons/fc'
import { Link } from 'react-router-dom'

const GridElement = ({scratch, handleLike}) => {  
  return (
    <div 
    className={styles.fullCard}
    key={scratch.id}
    >
        
        <Link to={`/userScratches/${scratch.id}`}>
          <div 
            // className={scratch.scratchDate ? [[styles["card-image"]],[styles["scratched"]]].join(' ') : styles["card-image"]}
            className={styles["card-image"]} 
            style={{
              backgroundImage: scratch.scratchDate ? `url(src/assets/activities/${scratch.id}.png)`:'none'            
            }}
            >          
          </div>
        </Link>
        
        <div className={styles["card-text"]}>
          <span className={styles.date}>{scratch.scratchDate ? `${scratch.scratchDate}` : 'data'}</span>
          <h2>{scratch.text}</h2>
          
          {scratch.scratchDate ? 
            scratch.liked ? 
            <FcLike/> 
            : 
            <FcLikePlaceholder
              onClick={()=>{
                handleLike(scratch.id)
              }}
            /> 
          : 
          <FcDislike/>}
        
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