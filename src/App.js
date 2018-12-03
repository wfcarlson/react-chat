import React, { Component } from 'react';
import './App.css';
import LoginComponent from './LoginComponent';
import { API_ROOT } from './config.js';
import HomeComponent from './HomeComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: null,
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

  request = (route, method, body) => {
    var token;

    if (this.state.token) {
      token = this.state.token;
    }
    else{
      token = sessionStorage.getItem('token');
      this.setState({token: token});
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

  logout = () => {
    this.setState({token: "", user: null})
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('user', null);
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
    if (this.state.user) {
      return this.state.user;
    }
    else {
      var user = JSON.parse(sessionStorage.getItem('user'));
      return user;
    }
  }

  render() {
    return (
      <div className="App">
        { this.getUser() ?
          <HomeComponent user={this.getUser()} logout={this.logout} request={this.request} />
            :
          <div className="login">
            <LoginComponent setToken={this.setToken} /> 
          </div>
        }
      </div>
    );
  }
}

export default App;
