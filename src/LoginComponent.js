import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { API_ROOT } from './config.js';
import CreateAccountDialogComponent from './CreateAccountDialogComponent';


export default class LoginComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            open: false,
        };
    }

    handleChange = (property) => (event) => {
        this.setState({ [property]: event.target.value });
    }

    login = () => {

        if (this.state.name && this.state.password) {
            this.setState({pError: false, nameError: false})
            var data = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"name": this.state.name, "password": this.state.password }),
            };
            
            fetch(API_ROOT + '/login', data)
                .then((response) => {
                    if (response.status === 200) {
                        this.props.setToken(response.headers.get("authorization"));
                    }
                    else {
                        this.setState({nameError: true, nameErrorMessage: "Invalid Login"});
                    }
                }) 
            .catch(err => { alert(err); });
        }
        else {
            if (!this.state.password) {
                this.setState({pError: true, pErrorMessage: "Password is required"});
            }
            if (!this.state.name) {
                this.setState({nameError: true, nameErrorMessage: "Username is required"});
            }
        }   
    }

    loginAccount = (username, password) => {
        this.setState({name: username, password: password}, () =>
            this.login()
        )
    }

    openAccountCreate = () => {
        this.setState({open: true});
    }

    closeAccountCreate = () => {
        this.setState({open: false});
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
                <CreateAccountDialogComponent close={this.closeAccountCreate} open={this.state.open} request={this.props.request} login={this.loginAccount}/>
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
                                    error={this.state.nameError}
                                    helperText={this.state.nameErrorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    onChange={this.handleChange('password')}
                                    style={styles.textField}
                                    error={this.state.pError}
                                    helperText={this.state.pErrorMessage}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.login}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <a 
                                    style={{
                                        color: "blue", 
                                        fontSize:'12px', 
                                        textDecoration:'underline',
                                        cursor: 'pointer'
                                    }} 
                                    onClick={this.openAccountCreate}
                                >
                                    create account
                                </a>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}