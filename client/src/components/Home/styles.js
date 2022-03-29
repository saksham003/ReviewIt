import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    // borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: '10px 16px ',
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
  }
}));
