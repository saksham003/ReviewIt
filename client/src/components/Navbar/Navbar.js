import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, Container  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/')
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  

  return (
    <AppBar className={classes.navContainer} position="static" color='default'>
      <Container>
        <Toolbar>
          <div className={classes.left}>
            <Typography component={Link} to='/' className={classes.reviewIt} variant="h4"> ReviewIT </Typography>
          </div>
          <div className={classes.right}>
            {user ? (
              <div className={classes.itemContainer}>
                <Avatar  alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.name} noWrap variant='h6'>
                  {user.result.name}
                </Typography>
                <Button variant='contained'  onClick={logout} color='secondary'>
                  Logout
                </Button>
              </div>
            ) : (
              <Button component={Link} to='/auth' variant='contained' color='primary'> Sign In </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    // <AppBar className={ classes.appBar } position="static" color="inherit">
    //   <div className={classes.brandContainer}>
    //   <Typography component={Link} to='/' className="classes.heading" variant="h2" align="center">
    //     ReviewIT
    //   </Typography>
    //   </div>
    //   <Toolbar className={classes.toolbar}>
    //     {user ? (
    //       <div className={classes.profile}>
    //         <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
    //           {/* {user.result.name.charAt(0)} */}
    //         </Avatar>
    //         <Typography className={classes.userName} variant='h6'>
    //           {user.result.name}
    //         </Typography>
    //         <Button variant='contained' className={classes.logout} onClick={logout} color='secondary'>
    //           Logout
    //         </Button>
    //       </div>
    //     ) : (
    //       <Button component={Link} to='/auth' variant='contained' color='primary'> Sign In </Button>
    //     )}
    //   </Toolbar>
    // </AppBar>
  );
}

export default Navbar