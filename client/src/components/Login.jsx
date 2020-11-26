import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button, KIND } from 'baseui/button';
import { requestLogin } from '../actions/auth';
import { dispatchError } from '../actions/error';
import Error from './Error';

const Login = ({ error, requestLogin, dispatchError }) => {
    const [formValues, setFormValues] = React.useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = React.useState({
        username: false,
        password: false
    });
    const [navigateToRegister, setNavigateToRegister] = React.useState(false);

    React.useEffect(() => {
        if(error.message == "wrong password") {
            setFormValues({
                ...formValues,
                password: ''
            });
            setFormErrors({
                ...formErrors,
                password: true
            });
        }
        if(error.message == "no user found") {
            setFormValues({
                username: '',
                password: ''
            });
            setFormErrors({
                ...formErrors,
                username: true
            });
        }
        if(!error.error) {
            setFormErrors({
                password: false,
                username: false
            });
        }
    }, [error]);

    const submitLogin = () => {
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
            return requestLogin({
                username: formValues.username,
                password: formValues.password
            });
        }
    }

    return (
        <>
            {
                navigateToRegister ?
                <Redirect to="/register" />
                :
                <Card>
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
                            type="password"
                            clearOnEscape
                            error={formErrors.password}
                        />
                    </FormControl>
                    <Button onClick={() => submitLogin()}>Login</Button>
                    <Button 
                        onClick={() => setNavigateToRegister(true)}
                        kind={KIND.secondary}
                    >Signup</Button>
                </Card>
            }
            <Error />
        </>
    )
}

const ConnectedLogin = connect(
    (state) => {
      return {
        error: state.error
      }
    }, 
    {
        requestLogin,
        dispatchError
    }
  )(Login);

export default ConnectedLogin;