import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/* Import Components */
import NavBar from './components/navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <NavBar /> */}
          <Home />
        </div>
      </Router>
    </div>
  );
}

export default App;
