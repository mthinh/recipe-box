import React, { Component } from 'react';
import './App.css';
import RecipePanel from './components/RecipePanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipePanel strings={[
          'I am hungry :(',
          'Lets make some food ' 
        ]}/>
      </div>
    );
  }
}

export default App;
