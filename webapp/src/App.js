import React, { Component } from 'react';
import './App.css';
import TopBar from "./Componants/TopBar";
import OxymeterValues from "./Componants/OxymeterValues";
import OxymeterActions from "./Componants/OxymeterActions";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <OxymeterValues />
        <OxymeterActions />
      </div>
    );
  }
}

export default App;
