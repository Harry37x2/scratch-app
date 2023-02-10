import React from 'react'
import styles from './bigCart.module.css'
import {Link, useParams } from 'react-router-dom';
import Sketch from 'react-p5';

const BigCart = ({scratches, handleScratched}) => {
  const { scratchId } = useParams();
  // const scratchIdParseInt = parseInt(scratchId);

  const current = scratches.find((each) => each.id === scratchId);
  const { scratchDate, text } = current;
  const currentDate = new Date().toLocaleDateString();

  return (
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Link to={'/userScratches'}>go Back</Link>
        </div>
        <div className={styles.title}>
          <h1>{scratchDate}</h1>
          <h1>{text}</h1>
          <p>id: {scratchId}</p>
        </div>
        <div className={styles["card-image"]}
            // className={scratch.scratchDate ? [[styles["card-image"]],[styles["scratched"]]].join(' ') : styles["card-image"]} (zamiast inline style)
            style={{
                backgroundImage: current.scratchDate ? `url(/src/assets/activities/${scratchId}.png)`:'none'
              }}
          >  
          </div>
        <div className={styles.footer}>
          <Link to={'/userScratches'}>go Back</Link>
          {current.scratchDate 
          ? null 
          : 
          <button
            onClick={() => current.scratchDate ? null : handleScratched(scratchId, currentDate)}
          >Scratched !
          </button>}
        </div>
      </div>
  );
}

export default BigCart



// useEffect(()=>{
//     try {
//     const unsub = onSnapshot(doc(db, "6eiz8pW2B0XXOMdQlvAZU1nPmsy2", "board01"), (doc) => {
//       let output = Object.keys(doc.data()).map(key => {
//         return {
//           key: key,
//           value: doc.data()[key]
//         };
//       })      
//       setScratches(output)
//       console.log(scratches)
//       setFetchError(null)
//     })
    
//     } catch (err) {
//       setFetchError(err.message)
//     } finally {
//       setIsLoading(false);
//     }
    
//   },[collect])