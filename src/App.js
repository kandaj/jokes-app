import React, { Component } from 'react';
import './App.css';
import JokesTable from './components/JokesTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokesTable />
      </div>
    );
  }
}

export default App;
