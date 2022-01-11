import './App.css';
import Layout from './Components/Layout/Layout/JS/Layout';
import React, { useEffect } from 'react'
import Home from './Pages/Home';
import { Route,Switch } from 'react-router-dom';
import SinglePost from './Pages/SinglePost';
import EditPost from './Components/EditPost/JS/EditPost';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import {useHistory} from 'react-router-dom';

function App() {
  const token=localStorage.getItem("Token");
  const userId=localStorage.getItem("userId");
  const expiryDate=localStorage.getItem("expiryDate");
  const date=new Date(new Date().getTime());
  const history=useHistory();
  useEffect(()=>{
    if(expiryDate<date){
      localStorage.removeItem("Token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
      history.push("/signup");
    }
  },[])

  return (
    <Switch>
      <Route path="/signup" exact>
          <Signup/>
      </Route>
      <Route path="/login" exact>
          <Login/>
      </Route>
      <Layout>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/post/viewPost/:postId" exact>
          <SinglePost/>
        </Route>
        <Route path="/post/editPost/:editPostId" exact>
          <EditPost/>
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
