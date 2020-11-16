import React from 'react';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Redirect } from 'react-router-dom';
import { StyledSpinnerNext } from 'baseui/spinner';
import axios from 'axios';

const Register = () => {
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [navigateToLogin, setNavigateToLogin] = React.useState(false);
    const [registering, setRegistering] = React.useState(false);

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
                    <Input 
                        value={nameValue}
                        onChange={e => setNameValue(e.target.value)}
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
                    />
                    <Button onClick={submitRegister}>Register</Button>
                    <Button onClick={() => setNavigateToLogin(true)}>Login</Button>
                </>
            }
        </Card>
    );
}

export default Register;