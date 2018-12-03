import React, { Component } from 'react';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


export default class MessageListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getChats(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getChats = () => {
        this.props.request("/chats/", "GET").then((data) => {
            data.json().then((response) => {
                this.setState({messages: response})
            })
        })
    }

    formatTime = (timestamp) => {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var str = ""
        var date = new Date(timestamp);
        var today = new Date();
        var month = date.getMonth();
        var day = date.getDate();

        if (day !== today.getDate() || month !== today.getMonth()) {
            str += monthNames[month] + " ";
            str += day + ", ";
        }

        str += date.getHours() + ":"
        if (date.getMinutes() < 10) str += "0";
        str += date.getMinutes();
        return str;
    }

    render() {
        return (
            <div style={{height: "100%", width: "100%"}}>
                <List>
                    {this.state.messages.map((message, i) =>
                        {
                            return (
                            <ListItem key={i}> 
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ color: '#D3D3D3' }}>{message.message}</Typography>} 
                                    secondary={<Typography type="body2" style={{ color: '#808080' }}>{message.user.name + " (" + this.formatTime(message.timestamp) + ")"}</Typography>}
                                />
                            </ListItem>
                            )
                        }
                    )}
                </List>
            </div>
        )
    }
}