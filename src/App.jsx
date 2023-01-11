import './App.css'
import Header from './components/Header'
import Grid from './components/Grid'
import BigCart from './components/BigCart'
import {useState} from 'react'

function App() {
  const [scratches, setScratches] = useState([
    {
      id: 1,
      text: 'cook together', 
      scratchDate: '03.03.2022', 
      liked: true,
      likes: 10,
      finished: 10
    },
    {
      id: 2,
      text: 'movie night',
      scratchDate: '', 
      liked: false,
      likes: 0,
      finished: 0
    },
    {
      id: 3,
      scratched: false,
      text: 'go to the zoo'
    },
    {
      id: 4,
      scratched: false,
      text: 'romantic ice skating'
    },
    {
      id: 5,
      scratched: false,
      text: 'make pizza together'
    },
    {
      id: 6,
      scratched: false,
      text: 'create your own tradition'
    },
    {
      id: 7,
      scratched: false,
      text: 'retake an old photo'
    },
    {
      id: 8,
      scratched: false,
      text: 'charity activity'
    },
    {
      id: 9,
      scratched: false,
      text: 'romantic breakfast'
    },
    {
      id: 10,
      scratched: false,
      text: 'prank someone'
    }
  ])
  const [modalOpen, setModalOpen] = useState(false);
  const [handleId, setHandleId] = useState('');

  const handleLike = (id) => {
    const likedList = scratches.map((item) => item.id === id ? 
    {...item, 
      likes: ++item.likes, 
      liked: true} 
    : item)
    setScratches(likedList);
  } 

  const handleScratched = (id, currentDate) => {
    const scratchesList = scratches.map((item) => item.id === id ? 
    {...item, 
      scratched: true, 
      scratchDate: currentDate, 
      finished: +1} 
    : item)
    setScratches(scratchesList);
  } 

  return (
    <div className="App">
      <Header />
      <Grid 
        scratches={scratches}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleId={handleId}
        setHandleId={setHandleId}
        handleLike={handleLike}
      />
      {modalOpen && 
        <BigCart          
          scratches={scratches}
          handleScratched={handleScratched}
          setModalOpen={setModalOpen}
          handleId={handleId}
          setHandleId={setHandleId}
        />}
    </div>
  )
}

export default App
