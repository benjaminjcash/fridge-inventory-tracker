import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyletron } from 'baseui';
import { Card } from 'baseui/card';
import { Input, SIZE as inputSize } from 'baseui/input';
import axios from 'axios';
import { Button, KIND, SIZE as buttonSize } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Modal, ModalHeader, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal";
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
    <>
      <Card
        className={css({ width: '100%', height: '100%' })}
      >
        {
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
                // size={inputSize.mini}
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
                // size={inputSize.mini}
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
                // size={inputSize.mini}
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
                // size={inputSize.mini}
              />
            </FormControl>
            <Button
              onClick={submitRegister}
              // size={buttonSize.mini}
              overrides={{
                BaseButton: { 
                  style: ({ $theme }) => ({ marginRight: '8px' })
                }
              }}
            >Register</Button>
            <Button
              onClick={navigateLogin}
              // size={buttonSize.mini}
            >Back</Button>
          </>
        }
      </Card>
      <Error />
      <Modal
        onClose={closeModal}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        // size={SIZE.default}
        role={ROLE.dialog}
        unstable_ModalBackdropScroll={true}
      >
        <ModalHeader>Success</ModalHeader>
        <ModalFooter>
          <ModalButton onClick={closeModal}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
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