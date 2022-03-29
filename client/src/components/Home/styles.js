import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: '16px ',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]:{
    mainContainer: {
      flexDirection: 'column-reverse'
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(7),
    right: theme.spacing(7),

  }
}));
