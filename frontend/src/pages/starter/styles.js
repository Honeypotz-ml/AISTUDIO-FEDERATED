import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  starterBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 2rem',
    width: '720px',
    h3: {
      textAlign: 'center',
    },
    p: {
      textAlign: 'center',
    },

    '@media (max-width: 767.98px)': {
      width: '520px',
      img: {
        width: '250px',
        height: '250px',
      },
    },
    '@media (max-width: 575.98px)': {
      width: '340px',
      img: {
        width: '150px',
        height: '150px',
      },
    },
  },

  img: {
    margin: '1rem 0',
    width: '350px',
    height: '350px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  a: {
    width: '100%',
  },
  leftButton: {
    width: '100%',
  },
  rightButton: {
    width: '100%',
    marginLeft: '16px',
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
    width: '100%',
    flexWrap: 'wrap',
  },
}));
