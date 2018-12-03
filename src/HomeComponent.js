import React, { Component } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AppBar, Toolbar } from '@material-ui/core';
import MessageListComponent from './MessageListComponent';



export default class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
    }

    updateMessage = (event) => {
        this.setState({message: event.target.value});
    }

    sendMessage = () => {
        this.props.request("/chats/", "POST", {message: this.state.message})
        this.setState({message: ""})
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <AppBar position="static" style={{flexGrow: 1}}>
                    <Toolbar>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Logged in as {this.props.user.name}
                        </Typography>
                        <Button color="inherit" onClick={this.logout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <MessageListComponent request={this.props.request} style={{flexGrow: 1, height: "300px"}}></MessageListComponent>
                <AppBar color="secondary" style={{bottom: 0, top: "auto"}}>
                    <Toolbar>
                    <TextField
                        value={this.state.message}
                        onChange={this.updateMessage}
                        className="messagebar"
                        style={{flexGrow: 1}}
                    />
                    <Button onClick={this.sendMessage}>Send</Button>
                    </Toolbar>  
                </AppBar>
            </div>
        )
    }
}