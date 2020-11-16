import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { requestLogin } from '../actions/auth';
import Error from '../components/Error';

const Login = ({ error, requestLogin }) => {
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [navigateToRegister, setNavigateToRegister] = React.useState(false);

    React.useEffect(() => {
        if(!error.error) {
            setUsernameValue('');
            setPasswordValue('');
        }
    }, [error]);

    const login = () => {
        return requestLogin({
            username: usernameValue,
            password: passwordValue
        });
    }

    return (
        <>
            {
                navigateToRegister ?
                <Redirect to="/register" />
                :
                <Card>
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
                    />
                    <Button onClick={login}>Login</Button>
                    <Button onClick={() => setNavigateToRegister(true)}>Signup</Button>
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

    }
  )(Login);

export default ConnectedLogin;