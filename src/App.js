import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/* Import Components */
import NavBar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
