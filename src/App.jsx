import './App.css';
import apiRequest  from './apiRequest';
import Header from './components/Header';
import Grid from './components/Grid';
import BigCart from './components/BigCart';
import {useState, useEffect} from 'react';

function App() {
  const API_URL = 'http://localhost:3500/scratches';

  const [scratches, setScratches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [handleId, setHandleId] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Expected data not received.')
        const listItems = await response.json();
        setScratches(listItems);
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      (async () => await fetchItems())();
    }, 1000)
  },[])

  const handleLike = async (id) => {
    const likedList = scratches.map((item) => item.id === id ? 
    {...item, 
      likes: ++item.likes, 
      liked: true} 
    : item)
    setScratches(likedList);

    const myItem = likedList.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        liked: myItem[0].liked,
        likes: myItem[0].likes
      })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result)
  } 

  const handleScratched = async (id, currentDate) => {
    const scratchesList = scratches.map((item) => item.id === id ? 
    {...item,  
      scratchDate: currentDate, 
      finished: +1} 
    : item)
    setScratches(scratchesList);

    const myItem = scratchesList.filter((item)=> item.id===id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scratchDate: myItem[0].scratchDate,
        finished: myItem[0].finished
      })
      }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
    
  } 

  return (
    <div className="App">
      <Header />
      {isLoading && <p>Loading Your scratches...</p>}
      {fetchError && <p>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && 
        <Grid 
          scratches={scratches}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleId={handleId}
          setHandleId={setHandleId}
          handleLike={handleLike}
        />}
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
