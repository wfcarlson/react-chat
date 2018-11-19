import React, { Component } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { API_ROOT } from './config.js';



export default class LoginComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }

    handleChange = (property) => (event) => {
        this.setState({ [property]: event.target.value });
    }

    login = () => {

        var data = {
			method: "POST",
			headers: {
                'Content-Type': 'application/json',
			},
			body: JSON.stringify({"name": this.state.name, "password": this.state.password }),
        };
        
        fetch(API_ROOT + '/login', data)
            .then((response) => { 
                this.props.setToken(response.headers.get("authorization"));
            }) 
        .catch(err => { console.log(err); });
}

    render() {
        const styles = {
            textField: {
                marginLeft: '60px',
                marginRight: '60px'
            },

            form: {
                display: 'flex',
                flexWrap: 'wrap',
            }
        }

        return (
            <Card>
                <CardContent>
                    <form style={styles.form} noValidate autoComplete="off">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    style={styles.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    onChange={this.handleChange('password')}
                                    style={styles.textField}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.login}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}