import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FolderButton() {
  const classes = useStyles();

  return (
    <div style={{ textAlign:"center"}}>

      <Fab variant="extended" aria-label="Delete" className={classes.fab} >
        <FolderIcon className={classes.extendedIcon} />
        Select WAV
      </Fab>


    </div>
  );
}
