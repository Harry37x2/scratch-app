import React from 'react'
import {FcLikePlaceholder,FcLike} from 'react-icons/fc'

const GridElement = ({scratch, setModalOpen, setHandleId, handleId, handleLike}) => {
  
  return (

    <div 
      className="card"
      key={scratch.id}
    >
      <div 
        className="card-image" 
        onClick={() => {
            setModalOpen(true);
            setHandleId(scratch.id);
          }}
        style={{
            backgroundImage: scratch.scratchDate ? `url(src/assets/activities/${scratch.id}.png)`:'none'            
          }}
      >
          
      </div>
      <div className="card-text">
        <span className="date">{scratch.scratchDate ? `${scratch.scratchDate}` : 'data'}</span>
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
      <div className="card-stats">
        <div className="stat">
          <div className="value">{scratch.likes}</div>
          <div className="type">Likes</div>
        </div>
        <div className="stat border">
          <div className="value">{scratch.finished}</div>
          <div className="type">finished:</div>
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