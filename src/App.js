import React , {useEffect , useContext, createContext ,  useReducer} from "react";
import "./App.css"
import NavBar from "./components/Navbar";
import { BrowserRouter,Routes,Route , useNavigate } from "react-router-dom"
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import SignIn from "./components/screens/SignIn";
import CreatePost from "./components/screens/CreatePost";
import {reducer , initialState} from "./components/reducers/userReducer" ;

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate() ;
  const {state , dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER" , payload:user})
      navigate('/')
    }else{
      navigate('/signin')
    }
  } , [])
  return(
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
  )
}
function App() {
  const [state , dispatch] = useReducer(reducer , initialState) 
  return (
    <UserContext.Provider value={{state , dispatch}}>
      <BrowserRouter>
      <NavBar />
      <Routing />
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
