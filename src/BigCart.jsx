import React from 'react'

const BigCart = ({setModalOpen, handleId, handleScratched}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>lol</p>   
          {handleId}      
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleScratched(handleId)}
          >Continue</button>
        </div>
      </div>
    </div>
  );
}

export default BigCart