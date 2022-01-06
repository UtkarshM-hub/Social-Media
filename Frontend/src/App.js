import './App.css';
import Layout from './Components/Layout/Layout/JS/Layout';
import React from 'react'
import Home from './Pages/Home';
import { Route,Routes,Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Layout>
        <Route path="/" exact>
          <Home/>
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
