import React,{useEffect,createContext,useReducer,useContext} from "react";
import NavBar from "./components/Navbar";
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from "./components/screens/SignIn"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost"
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribeUserPosts from './components/screens/SubscribeUserPosts'
import Reset from './components/screens/Reset'
import Newpassword from './components/screens/Newpassword'
export const UserContext= createContext()


const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signIn">
            <SignIn />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/CreatePost">
          <CreatePost />
        </Route>
        <Route path= "/profile/:userid">
          <UserProfile />
        </Route>
        <Route path= "/myfollowingspost">
          <SubscribeUserPosts />
        </Route>
        <Route exact path= "/reset">
          < Reset />
        </Route>
        <Route path= "/reset:token">
          < Newpassword />
        </Route>
        
      </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
