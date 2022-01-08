import './App.css';
import Layout from './Components/Layout/Layout/JS/Layout';
import React from 'react'
import Home from './Pages/Home';
import { Route,Switch } from 'react-router-dom';
import SinglePost from './Pages/SinglePost';
import EditPost from './Components/EditPost/JS/EditPost';

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
        <Route path="/post/editPost/:editPostId" exact>
          <EditPost/>
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
