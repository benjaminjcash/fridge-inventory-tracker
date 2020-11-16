import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import axios from 'axios';
import { Button, KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Redirect } from 'react-router-dom';
import { StyledSpinnerNext } from 'baseui/spinner';
import { dispatchError } from '../actions/error';
import Error from './Error';

const Register = ({ error, dispatchError }) => {
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

    React.useEffect(() => {
        if(error.message == "account already exists") {
            setFormValues({
                name: '',
                email: '',
                username: '',
                password: ''
            });
            setRegistering(false);
        }
        if(!error.error) {
            setFormErrors({
                name: false,
                email: false,
                password: false,
                username: false
            });
        }
    }, [error]);
    
    const submitRegister = () => {
        let fields = Object.keys(formValues);
        let errors = {};
        let hasErrors = false;
        for(const field of fields) {
            if(formValues[field].length == 0) {
                errors[field] = true;
                hasErrors = true;
            }
        }
        if(hasErrors) {
            setFormErrors({
                ...formErrors,
                ...errors
            });
            dispatchError("empty fields");
        } else {
            setRegistering(true);
            const data = {
                username: formValues.username,
                password: formValues.password,
                name: formValues.name,
                email: formValues.email
            }
            axios.post('http://localhost:3001/api/auth/register', data).then((res) => {
                if(res?.data?.success) {
                    setRegistering(false);
                    setNavigateToLogin(true);
                } else {
                    dispatchError("account already exists");
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    return (
        <>
        <Card>
            {
                navigateToLogin ?
                    <Redirect to="/login" />
                :
                registering ?
                    <StyledSpinnerNext />
                :
                    <>
                    <FormControl label="Name">
                        <Input 
                            value={formValues.name}
                            onChange={e => setFormValues({
                                ...formValues,
                                name: e.target.value
                            })}
                            placeholder="Name"
                            clearOnEscape
                            error={formErrors.name}
                        />
                    </FormControl>
                    <FormControl label="Email">
                        <Input 
                            value={formValues.email}
                            onChange={e => setFormValues({
                                ...formValues,
                                email: e.target.value
                            })}
                            placeholder="Email"
                            clearOnEscape
                            error={formErrors.email}
                        />
                    </FormControl>
                    <FormControl label="Username">
                        <Input 
                            value={formValues.username}
                            onChange={e => setFormValues({
                                ...formValues,
                                username: e.target.value
                            })}
                            placeholder="Username"
                            clearOnEscape
                            error={formErrors.username}
                        />
                    </FormControl>
                    <FormControl label="Password">
                        <Input 
                            value={formValues.password}
                            onChange={e => setFormValues({
                                ...formValues,
                                password: e.target.value
                            })}
                            placeholder="Password"
                            clearOnEscape
                            error={formErrors.password}
                        />
                    </FormControl>
                    <Button onClick={submitRegister}>Register</Button>
                    <Button 
                        onClick={() => setNavigateToLogin(true)}
                        kind={KIND.secondary}
                    >Login</Button>
                    </>
            }
        </Card>
        <Error/>
        </>
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