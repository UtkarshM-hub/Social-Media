import './App.css';
import Layout from './Components/Layout/Layout/JS/Layout';
import React from 'react'
import Home from './Pages/Home';
import { Route,Routes,Switch } from 'react-router-dom';
import SinglePost from './Pages/SinglePost';

function App() {
  return (
    <Switch>
      <Layout>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/post/viewPost/:postId" exact>
          <SinglePost/>
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
