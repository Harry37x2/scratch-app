import './App.css'
import Header from './Header'
import Grid from './Grid'
import {useState} from 'react'
import BigCart from './BigCart'

function App() {
  const [scratches, setScratches] = useState([
    {
      id: 1,
      scratched: false,
      text: 'cook together'
    },
    {
      id: 2,
      scratched: false,
      text: 'movie night'
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
      text: 'drugi'
    },
    {
      id: 7,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 8,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 9,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 10,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 11,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 12,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 13,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 14,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 15,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 16,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 17,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 18,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 19,
      scratched: false,
      text: 'drugi'
    },
    {
      id: 20,
      scratched: false,
      text: 'drugi'
    }
  ])
  const [modalOpen, setModalOpen] = useState(false);
  const [handleId, setHandleId] = useState('');

  const handleScratched = (id) => {
    const scratchesList = scratches.map((item) => item.id === id ? {...item, scratched: !item.scratched} : item)
    setScratches(scratchesList);
  } 

  return (
    <div className="App">
      <Header />
      <Grid 
        scratches={scratches}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setHandleId={setHandleId}
      />
      {modalOpen && 
        <BigCart 
          setModalOpen={setModalOpen}
          handleId={handleId}
          handleScratched={handleScratched}
        />}
    </div>
  )
}

export default App
