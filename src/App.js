import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/* Import Components */
import NavBar from './components/navbar';

/* Import Pages */

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <h1>Hello</h1>
        </div>
      </Router>
    </div>
  );
}

export default App;
