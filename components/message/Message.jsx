import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = ({ message, type = 'error' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={type}>
        {message} — !
      </Alert>
    </div>
  );
};

export default Message;
