import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
class App extends Component {
  handleClick(){
    console.log("4444");
    window.close();
    // axios.get("/api/ADFunctionApp").then((res)=>{
    //   console.log(res);
    // })
  }
  
  render() {
    return (
      <div className="App">
        <button  onClick={this.handleClick.bind(this)} >get</button>
        <header className="App-header">
        
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
