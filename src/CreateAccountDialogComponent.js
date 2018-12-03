import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import './App.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { API_ROOT } from './config';



export default class CreateAccountDialogComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            nameError: false,
            nameErrorMessage: "",
            password: "",
            pError: false,
            pErrorMessage: "",
            confirmPassword: "",
            cError: false,
            cErrorMessage: "",
        }
    }
    
    handleChange = (property) => (event) => {
        this.setState({ [property]: event.target.value });
    }

    componentDidMount() {
        this.setState({nameError: false, pError: false, cError: false})
    }

    createUser = () => {
        this.setState({pError: false, nameError: false, cError: false})
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({cError: true, cErrorMessage: "password confirmation doesn't match"})
            return;
        }
        if (this.state.name && this.state.password && this.state.confirmPassword) {
            var data = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: this.state.name, password: this.state.password}),
            };
            
            fetch(API_ROOT + "/user/create", data).then((response) => {
                if (response.status === 200) {
                    this.props.login(this.state.name, this.state.password);
                }
                else {
                    alert("error: " + response.status + " " + response.statusText);
                }
            });
        }
        else {
            if (!this.state.password) {
                this.setState({pError: true, pErrorMessage: "Password is required"});
            }
            if (!this.state.name) {
                this.setState({nameError: true, nameErrorMessage: "Username is required"});
            }
            if (!this.state.confirmPassword) {
                this.setState({cError: true, cErrorMessage: "Password confirmation is required"});
            }
        } 
    }

    render() { 
        const styles = {
            textField: {
                marginLeft: '60px',
                marginRight: '60px',
            },

            form: {
                display: 'flex',
                flexWrap: 'wrap',
            }
        }

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.close}
            >
                <DialogTitle>
                    <Typography>
                        Create Account
                    </Typography>
                    <form style={styles.form} noValidate autoComplete="off">
                    <input type="password" name='fake-password' autoComplete='new-password' tabIndex='-1' style={{display: "none"}}/>

                        <TextField
                            label="Username"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            style={styles.textField}
                            error={this.state.nameError}
                            helperText={this.state.nameErrorMessage}
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            autoComplete="new-password"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            margin="normal"
                            onChange={this.handleChange('password')}
                            style={styles.textField}
                            error={this.state.pError}
                            helperText={this.state.pErrorMessage}
                        /> 
                        <TextField
                            label="Confirm Password"
                            type="password"
                            margin="normal"
                            onChange={this.handleChange('confirmPassword')}
                            style={styles.textField}
                            error={this.state.cError}
                            helperText={this.state.cErrorMessage}
                        /> 
                        <Button onClick={this.createUser}>
                            Submit
                        </Button>
                    </form>
                </DialogTitle>
            </Dialog>
        )
    }
}