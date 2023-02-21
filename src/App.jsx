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
  const [collect, setCollect] = useState('')
  const [board, setBoard] = useState('')
  let outputUserDB
  let outputGlobalDB = {}

// query all scratches from user db
useEffect(()=>{  
  try {
    const unsub = onSnapshot(doc(db, collect, board), (doc) => {
      outputUserDB = Object.keys(doc.data()).map(key => {
        return {
          key: key,
          value: doc.data()[key]
        };
      })
      setFetchError(null)
      console.log(outputUserDB)
      return outputUserDB
    })    
  } catch (err) {
    setFetchError(err.message)
  } finally {
    setIsLoading(false);
  }    
},[board])

// query all scratches from global db
useEffect(() => {
  try {
    const q = query(collection(db, board));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = []  
      querySnapshot.forEach((doc) => {
        arr.push(doc.id)
        // arr.push(Object.keys(doc.id, doc.data()).map(key => {
        arr.push(Object.keys(doc.data()).map(key => {
          return {
            key: key,
            value: doc.data()[key]
          };
        }))
      });
      //assigning it to even
      console.log(arr)
      let odd=[]
      let even=[]
      for (let i=0; i<arr.length; i++) {
        if (i % 2 == 0){
        odd.push(arr[i]);
      }else{
        even.push(arr[i]);
        }
      }
      for (let i=0; i<odd.length; i++) {
        even[i]['key']=odd[i]
      }
      console.log(even)
      return even
    });
  } catch (err) {
    setFetchError(err.message)
  } finally {
    setIsLoading(false);
  }
},[board])

    // const unsubb = onSnapshot(doc(db, board, 'JdxPz7Ku60DnCuicpIgq'), (doc) => {
    //   outputGlobalDB = Object.keys(doc.data()).map(key => {
    //     return {
    //       key: key,
    //       value: doc.data()[key]
    //     };
    //   })          
    //   // marge fileds from global Db with user Db
    //   outputUserDB[0].value[outputGlobalDB[0].key]=[(outputGlobalDB[0].value)].toLocaleString()
    //   outputUserDB[0].value[outputGlobalDB[1].key]=[(outputGlobalDB[1].value)].toLocaleString()
    //   outputUserDB[0].value[outputGlobalDB[2].key]=[(outputGlobalDB[2].value)].toLocaleString()
    //   // for (let i=0; i<=outputGlobalDB.length; i++) {
    //     //   outputUserDB[0].value[outputGlobalDB[i].key]=[(outputGlobalDB[i].value)].toLocaleString()
    //     // }       
    //     setScratches(outputUserDB)
    //     console.log(outputUserDB)
    //   console.log(outputGlobalDB)
    //   setFetchError(null)
    // })    

  // Handle likes and liked; UPDATE in firebase
  
  const handleLike = async (id) => {    
    const likedList = scratches.map((item) => item.id === id ? 
    {...item, 
      likes: item.liked?--item.likes:++item.likes, 
      liked: !item.liked} 
      : item)
      setScratches(likedList);

    const myItem = likedList.filter((item) => item.id === id);
    await updateDoc(doc(db, collect, id),{
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
    await updateDoc(doc(db, collect, id),{
      scratchDate: myItem[0].scratchDate,
      finished: myItem[0].finished,
    });
  } 

  // Creating user board with 3 scratches and only with ID from db boards  
  
  //uid = userId; bid = boardID
  let queryItems = []
  const randomItems = []
  let docData = {};  

  // Query ID off all scratches from db.
  const handleCreateBoard = async (uid, bid) => {
    setCollect(uid)
    setBoard(bid)
    try {
      const q = query(collection(db, bid))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((scratch) => {
          queryItems.push(scratch.id)
        });        
        
        //random 3 scratches for user
        for (let i=0; i<=2; i++) {
          let index = Math.floor(Math.random()*queryItems.length)
          randomItems.push(queryItems[index])
          queryItems.splice(index,1)
        }

        //add fields to choosen scratches 
        docData = Object.fromEntries(randomItems.map(scratch => 
          [scratch, {
            userScratchIds: scratch,
            scratchDate: '',
            liked: false
          }])          
        ) 
      setDoc(doc(db, uid, bid), docData
      );
      setFetchError(null)
    })
    return() => unsubscribe()
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false);
    }    
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
              <Route path='boards' element={
              <Boards
                handleCreateBoard={handleCreateBoard}
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
