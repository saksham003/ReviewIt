import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles'
import Input from './Input';
import Icon from './icon'
import { signIn, signUp } from '../../actions/auth';

const initalState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initalState);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value })
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    
    if(isSignup){
      dispatch(signUp(formData, history))
    }else {
      dispatch(signIn(formData, history))
    }
  };
  const switchMode = () => setIsSignup((prev) => !prev)

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = (err) => {
    console.log(err);
    console.log('Google Sign In was unsuccessfull. Try Again Later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} half />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                </>
              )}
              <Input name='email' label='Email Address' handleChange={handleChange} type='text'/>
              <Input name='password' label='Password' handleChange={handleChange} type='password'/>
              {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>}
          </Grid>
        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
        <GoogleLogin 
          clientId='730669184231-vrct4vv7ghcae9kfr3rfgqh1tvt8c62e.apps.googleusercontent.com'
					render={(renderProps) => (
            <Button className={classes.googleButton} color='secondary' variant='contained' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}>
              Sign In with Google
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
        />
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link underline="none" component="button" color='textSecondary' onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign In': 'Don\'t have an account? Sign Up'}
            </Link>
          </Grid>
        </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth