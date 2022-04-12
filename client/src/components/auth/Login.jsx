import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button, SIZE, SHAPE } from 'baseui/button';
import { requestLogin } from '../../actions/auth';
import { dispatchError } from '../../actions/error';
import Error from '../shared/Error';

const Login = ({ error, requestLogin, dispatchError }) => {
  const [css, theme] = useStyletron();
  let history = useHistory();

  const [formValues, setFormValues] = React.useState({
   username: '',
   password: ''
  });
  const [formErrors, setFormErrors] = React.useState({
   username: false,
   password: false
  });

  const navigateRegister = () => {
    history.push('/register');
  }

  const submitLogin = () => {
    let fields = Object.keys(formValues);
    let errors = {};
    let hasErrors = false;
    for (const field of fields) {
      if (formValues[field].length == 0) {
        errors[field] = true;
        hasErrors = true;
      }
    }
    if (hasErrors) {
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

  React.useEffect(() => {
  if (error.message == "Invalid password, please try again") {
    setFormValues({
      ...formValues,
      password: ''
    });
    setFormErrors({
      ...formErrors,
      password: true
    });
  }
  if (error.message == "No user found with that username") {
    setFormValues({
      username: '',
      password: ''
    });
    setFormErrors({
      ...formErrors,
      username: true
    });
  }
  if (!error.error) {
    setFormErrors({
      password: false,
      username: false
    });
  }
  }, [error]);

  return (

  <FlexGrid>
    <FlexGridItem>
      <h1>Fridge Inventory Tracker</h1>
    </FlexGridItem>
    <FlexGridItem>
    <Card className={css({ width: '100%', height: '100%' })}>
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
      <Button
        onClick={() => submitLogin()}
        size={SIZE.compact}
        shape={SHAPE.pill}
        overrides={{
          BaseButton: { 
            style: ({ $theme }) => ({ marginRight: '8px' })
          }
        }}
      >Login</Button>
      <Button
        size={SIZE.compact}
        shape={SHAPE.pill}
        onClick={() => navigateRegister()}
      >Register</Button>
      </Card>
    </FlexGridItem>
    <FlexGridItem>
      <Error />
    </FlexGridItem>
  </FlexGrid>
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