import { makeStyles, alpha } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    // borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // padding: '10px 16px ',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '10px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    appBarSearch: {
      flexDirection: 'column',
    },
    chipInput: {
      margin: '10px 0',
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(7),
    right: theme.spacing(7),
  },
  modalTitle: {
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  chipInput: {
    fontSize: '0.5rem',
    // margin: '0 20px'
  },

  [theme.breakpoints.up('md')]: {
    chipInput: {
      margin: '0 20px',
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    color: '#BDBDBD',
  },
  inputRoot: {
    color: 'inherit',
    background: '#EEEEEE'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '10px 0'
    }
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
  }
}));
