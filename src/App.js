import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/* Import Components */
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
        </div>
      </Router>
    </div>
  );
}

export default App;
