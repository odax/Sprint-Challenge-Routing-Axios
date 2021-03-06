import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';
class App extends Component {
  constructor () {
    super();
    this.state = {
      smurfs: []
    };
  }
  componentDidMount() {
    this.getSmurfs();
  }

  getSmurfs = () => {
    axios.get('http://localhost:3333/smurfs').then(stuff => {
      this.setState({ smurfs: stuff.data });
    })
    .catch(error => {
      console.log(error);
    });
  };

addSmurfsNew = (smurfs) => {
  this.setState({smurfs});
};

deleteSmurf = (e) => {
  axios.delete(`http://localhost:3333/smurfs/${e.target.id}`)
    .then(response => {
      this.getSmurfs();
      console.log(response);
    })
    .catch(error => {
      console.log(`Error deleting smurf: ${error}`);
    })
}
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    const { smurfs } = this.state;
    return (
      <div className="App">
        <SmurfForm addSmurfsNew={this.addSmurfsNew} />
        <Smurfs deleteSmurf={this.deleteSmurf} smurfs={smurfs}/>
      </div>
    ); 
  }

}

export default App;
