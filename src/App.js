import './App.css';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react'
import Locationdata from './components/Locationdata';

export default class App extends Component {

  render() {
    return (
      <div>
        <Locationdata/>
        {/* <Router>
          <Routes>
            <Route/>
          </Routes>
        </Router> */}
      </div>

    )
  }
}
