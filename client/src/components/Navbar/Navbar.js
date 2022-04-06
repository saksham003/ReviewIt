import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, Container, Switch, IconButton, Popover, Paper, Divider, Chip  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles'
import { setTheme } from '../../actions/theme';

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { themeType } = useSelector((state) => state.theme);

  const onChangeTheme = (e) => {
   setIsDarkTheme(e.target.checked)
   dispatch(setTheme(e.target.checked ? 'DARK' : 'LIGHT'));
  }

  const handleModalClose = () => setAnchorEl(null)

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
            <Typography component={Link} to='/' className={classes.reviewIt} variant="h4"> Review It </Typography>
          </div>
          <div className={classes.right}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar  alt={user?.result?.name} src={user?.result?.imageUrl}>
              {user?.result?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleModalClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }} transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
            <Paper elevation={6} className={classes.modalContainer} >
              {user && ( <div className={classes.itemContainer}>
                  <Avatar className={classes.avatar}  alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                  </Avatar>
                  <Typography noWrap variant='h6'>
                    {user.result.name}
                  </Typography>
                  <Chip label="Member" variant="outlined" />
                  <Divider style={{ margin: '10px 0', width:'100%' }}/>
                </div>
              )}
                <div style={{ display:'flex', alignItems:'center', marginBottom:'10px'  }} >
                  <Typography noWrap>Dark Mode:</Typography>
                  <Switch checked={isDarkTheme} onChange={onChangeTheme} />
                </div>
                {user ? (
                  <Button variant='contained'  onClick={logout} color='secondary'>
                    Logout
                  </Button>
                ): (
                  <Button component={Link} to='/auth' variant='contained' color='primary'> Sign In </Button>
                )}
            </Paper>
          </Popover>
            {/* {user ? (
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
            <Switch checked={isDarkTheme} onChange={onChangeTheme} /> */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar