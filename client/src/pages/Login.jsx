import React from 'react';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const Login = ({ requestLogin }) => {
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    
    const login = () => {
        return requestLogin({
            username: usernameValue,
            password: passwordValue
        });
    }

    return (
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
            <Button onClick={() => login()}>Login</Button>
        </Card>
    )
}

export default Login;