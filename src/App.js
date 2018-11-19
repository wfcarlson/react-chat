import React, { Component } from 'react';
import './App.css';
import LoginComponent from './LoginComponent';
import { API_ROOT } from './config.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: {},
    }
  }

  setToken = (token) => {

    sessionStorage.setItem('token', token);

    this.setState({token: token});

    var data = {
			method: "GET",
			headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
			},
			mode: 'cors',
      };
      
      fetch(API_ROOT + '/user/', data)
      .then((data) => { 
          data.json()
              .then((data) => { 
                  this.setUser(data);
              }) 
      })
      .catch(err => { console.log(err); });
  }

  req = (route, method, body) => {
    var token;

    if (this.state.token) {
      token = this.state.token;
    }
    else{
      token = sessionStorage.getItem('token');
      this.setState(token);
    }

    var data = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(body)
      };
      
    return fetch(API_ROOT + route, data);
  }

  loggedIn = () => {
    if (this.state.token || sessionStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  setUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.setState({ user:user });
  }

  getUser = () => {
    if (this.state.user.name) {
      return this.state.user;
    }
    else {
      var user = JSON.parse(sessionStorage.getItem('user'));
      this.setState({ user: user });
      return user;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { this.loggedIn() ?  "Logged in as " + this.getUser().name : <LoginComponent setToken={this.setToken} /> }
        </header>
      </div>
    );
  }
}

export default App;
