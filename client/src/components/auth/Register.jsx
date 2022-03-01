import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyletron } from 'baseui';
import { Card } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Input } from 'baseui/input';
import axios from 'axios';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { dispatchError } from '../../actions/error';
import Error from '../shared/Error';

const Register = ({ error, dispatchError }) => {
  const [css, theme] = useStyletron();
  let history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
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

  const closeModal = () => {
    setIsOpen(false);
    navigateLogin();
  }

  const submitRegister = () => {
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
      setFormValues({
        name: '',
        email: '',
        username: '',
        password: ''
      });
      const data = {
        username: formValues.username,
        password: formValues.password,
        name: formValues.name,
        email: formValues.email
      }
      axios.post('/api/auth/register', data).then((res) => {
        if (res?.data?.success) {
          setIsOpen(true);
        } else {
          dispatchError(res?.data?.error);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  const navigateLogin = () => history.push('/login');

  React.useEffect(() => {
    if (error.message == "account already exists") {
      setFormValues({
        name: '',
        email: '',
        username: '',
        password: ''
      });
    }
    if (!error.error) {
      setFormErrors({
        name: false,
        email: false,
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
        <Card>
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
          <Button
            onClick={submitRegister}
            overrides={{
            BaseButton: { 
              style: ({ $theme }) => ({ marginRight: '8px' })
            }
            }}
          >Register</Button>
          <Button
            onClick={navigateLogin}
          >Back</Button>
        </Card>
      </FlexGridItem>
      <FlexGridItem>
        <Error />
      </FlexGridItem>
    </FlexGrid>
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