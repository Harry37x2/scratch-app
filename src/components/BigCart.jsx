import React from 'react'
import styles from './bigCart.module.css'

const BigCart = ({scratches, setModalOpen, handleId, setHandleId, handleScratched}) => {
  const current = scratches.filter(each => each.id === handleId);
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setModalOpen(false);
              setHandleId('');
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1>{current[0].text}</h1>
        </div>
        <div className={styles.body}>
          <p>id: {handleId}</p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setModalOpen(false);              
              setHandleId('')
            }}
            id={styles.cancelBtn}
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