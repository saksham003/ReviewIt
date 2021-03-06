import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  itemContainer: {
    display: 'flex',
    gap: '10px',
    width: '200px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    // margin: '10px 20px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  reviewIt: {
    color: 'black',
    textDecoration: 'none'
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  left: {
    marginRight: 'auto'
  },
  right: {
    marginLeft: 'auto',
    // display: 'flex', alignItems: 'center',
  },
  navContainer: {
    marginBottom: '16px',
    // backgroundColor: theme.palette.tertiary.main,
  },
  // name: {
  //   marginLeft: '10px',
  //   marginRight: '20px',
  //   paddingTop: '4px'
  // },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));