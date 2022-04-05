import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: '2 2 0',
  },
  imageSection: {
    marginRight: '20px',
    flex: '1 1 0',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentOuterContainer: {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  },
  commentInnerContainer: {
    height: '200px', overflowY: 'auto', marginRight: '30px'
  },
  chipGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  mediaCard: {
    height: 0,
    paddingTop: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  modalTitle: {
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  displayLinebreak: {
  whiteSpace: 'pre-line',
  padding: '25px 0'
  },
  ratingContainer: {
    display:'flex', justifyContent:'space-between', flexDirection:'column',
  }
}));