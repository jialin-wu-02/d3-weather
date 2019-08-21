import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import magnifiertool from './img/magnifier-tool.png';

import BarChart from './components/BarChart';

import './App.css';

class App extends Component {
  state = {
    searchFinish: false,
    address: '',
    location: '',
    weatherData: ''
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: this.state.address }),
    });
    const body = await response.json();
    console.log(body)
    this.setState({ 
      searchFinish: true,
      weatherData: body.forecast,
      location: body.location
    });
    console.log(this.state);
  };
  
  render() {
      return (
        <div className="main-content">
          <Header title={this.state.location ? this.state.location : "Weather"} />
          {!this.state.searchFinish ?           
          <form className="search-form" onSubmit={this.handleSubmit}>
              <input value={this.state.address} onChange={e => this.setState({ address: e.target.value })} className="search-input" type="text" />
              <input img className="search-button" onClick={this.handleSubmit} src={magnifiertool} type="image" alt="submit" 
              style={{width: "36px"}}/>
          </form> : 
          <BarChart /> }
          <Footer />
        </div>
      );
    }
  }

export default App;