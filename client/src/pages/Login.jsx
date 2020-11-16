import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const Login = ({ requestLogin }) => {
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [navigateToRegister, setNavigateToRegister] = React.useState(false);

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
        </>
    )
}

export default Login;