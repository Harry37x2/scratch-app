import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
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
import Boards from './pages/Boards';

import { query, collection, onSnapshot, updateDoc, doc, setDoc } from '@firebase/firestore';
import { db } from './firebase';


function App() {

  const [scratches, setScratches] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(()=>{
    try {
    const q = query(collection(db, 'user-scratches'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let listItems = [];
      querySnapshot.forEach((scratch) => {
        listItems.push({...scratch.data(),id: scratch.id})
      });
      setScratches(listItems)
      setFetchError(null)
    })
    return() => unsubscribe()
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false);
    }
    
  },[])

  // Handle likes and liked; UPDATE in firebase
  const handleLike = async (id) => {    
    const likedList = scratches.map((item) => item.id === id ? 
    {...item, 
      likes: item.liked?--item.likes:++item.likes, 
      liked: !item.liked} 
      : item)
      setScratches(likedList);

    const myItem = likedList.filter((item) => item.id === id);
    await updateDoc(doc(db,'user-scratches', id),{
      likes: myItem[0].likes,
      liked: myItem[0].liked,
    });
  } ;

  const handleScratched = async (id, currentDate) => {
    const scratchesList = scratches.map((item) => item.id === id ? 
    {...item,  
      scratchDate: currentDate, 
      finished: +1} 
    : item)
    setScratches(scratchesList);

    const myItem = scratchesList.filter((item)=> item.id === id);
    await updateDoc(doc(db,'user-scratches', id),{
      scratchDate: myItem[0].scratchDate,
      finished: myItem[0].finished,
    });
  } 

  const createBoard = async (uid, bid) => {
    await setDoc(doc(db, uid, bid), {
      name: 'lol',
    });
  }
  // const handleNewBoard = async (id) => {
  //   console.log('lol')
  //   await addDoc(db,'new'),{
  //     name: 'lol',
  //   };
  // }
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
              <Route path='boards' element={
              <Boards
                createBoard={createBoard}
              />}/>
              <Route path='userScratches' element={
                isLoading ? <Loading/> :
                fetchError ? <Error/> :
                !fetchError && !isLoading && 
                <UserScratches
                scratches={scratches}
                handleLike={handleLike}/>
              }/>
              <Route path='userScratches/:scratchId' element={
                <ProtectedRoute>
                  <BigCart
                    scratches={scratches}
                    handleScratched={handleScratched}
                    />
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
