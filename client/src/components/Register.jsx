import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Redirect } from 'react-router-dom';
import { StyledSpinnerNext } from 'baseui/spinner';
import { dispatchError } from '../actions/error';
import axios from 'axios';

const Register = () => {
    const [formValues, setFormValues] = React.useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = React.useState({
        name: false,
        email: false,
        username: false,
        password: false
    });
    const [navigateToLogin, setNavigateToLogin] = React.useState(false);
    const [registering, setRegistering] = React.useState(false);

    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    

    const submitRegister = () => {



        setRegistering(true);
        const data = {
            username: usernameValue,
            password: passwordValue,
            name: nameValue,
            email: emailValue
        }
        axios.post('http://localhost:3001/api/auth/register', data).then((res) => {
            setRegistering(false);
            setNavigateToLogin(true);
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <Card>
            {
                navigateToLogin ?
                <Redirect to="/login" />
                :
                registering ?
                
                <StyledSpinnerNext />
                :
                <>
                    {Object.keys(formValues).map((value) => {
                        return (
                            <FormControl key={value} label={value}>
                                <Input 
                                key={value}
                                value={value}
                                onChange={e => setFormValues({
                                    ...formValues,
                                    value: e.target.value
                                })}
                                placeholder={value}
                                clearOnEscape
                                />
                            </FormControl>
                        );
                    })}
                    {/* <Input 
                        value={formValues.name}
                        onChange={e => setFormValues({
                            ...formValues,
                            name: e.target.value
                        })}
                        placeholder="Name"
                        clearOnEscape
                    />
                    <Input 
                        value={emailValue}
                        onChange={e => setEmailValue(e.target.value)}
                        placeholder="Email"
                        clearOnEscape
                    />
                    <Input 
                        value={usernameValue}
                        onChange={e => setUsernameValue(e.target.value)}
                        placeholder="Username"
                        clearOnEscape
                    />
                    <Input 
                        value={passwordValue}
                        onChange={e => setPasswordValue(e.target.value)}
                        placeholder="Password"
                        clearOnEscape
                    /> */}
                    <Button onClick={submitRegister}>Register</Button>
                    <Button 
                        onClick={() => setNavigateToLogin(true)}
                        kind={KIND.secondary}
                    >Login</Button>
                </>
            }
        </Card>
    );
}

const ConnectedRegister = connect(
    (state) => {
      return {
        error: state.error
      }
    }, 
    {
        dispatchError
    }
  )(Register);

export default ConnectedRegister;