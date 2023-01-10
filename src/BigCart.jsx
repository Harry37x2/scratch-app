import React from 'react'

const BigCart = ({scratches, setModalOpen, handleId, setHandleId, handleScratched}) => {
  const current = scratches.filter(each => each.id === handleId);
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
              setHandleId('');
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{current[0].text}</h1>
          {/* {console.log(current)} */}
        </div>
        <div className="body">
          <p>id: {handleId}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);              
              setHandleId('')
            }}
            id="cancelBtn"
          >
            Not now
          </button>
          <button
            onClick={() => {
              handleScratched(handleId, currentDate);
              setModalOpen(false);
              setHandleId('')
              
            }}
          >Scratched !</button>
        </div>
      </div>
    </div>
  );
}

export default BigCart