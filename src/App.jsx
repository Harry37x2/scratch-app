import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import apiRequest  from './apiRequest';
import SharedLayout from './pages/SharedLayout';
import { AuthProvider } from './contexts/AuthContext';
import UserScratches from './components/UserScratches';
import BigCart from './components/BigCart';
import Loading from './components/Loading';
import Error from './components/Error';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfil';


function App() {
  const API_URL = 'http://localhost:3000/scratches';

  const [scratches, setScratches] = useState([]);
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
    }, 500)
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

    const myItem = scratchesList.filter((item)=> item.id === id);
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
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<SharedLayout/>}>
              <Route index element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
            }/>
              <Route path='userScratches' element={
                isLoading ? <Loading/> :
                fetchError ? <Error/> :
                !fetchError && !isLoading && 
                <UserScratches
                scratches={scratches}
                handleId={handleId}
                setHandleId={setHandleId}
                handleLike={handleLike}/>
              }/>
              <Route path='userScratches/:scratchId' element={
                <ProtectedRoute>
                  <BigCart
                    scratches={scratches}
                    handleScratched={handleScratched}
                    handleId={handleId}
                    setHandleId={setHandleId}/>
                </ProtectedRoute>
              }/>
              </Route>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/update-profile' element={
              <ProtectedRoute>
                <UpdateProfile/>
              </ProtectedRoute>
              }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
