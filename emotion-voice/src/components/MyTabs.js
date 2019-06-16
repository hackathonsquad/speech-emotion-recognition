import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../App.css';
import Voice from "./Voice"
import SwipeableViews from 'react-swipeable-views';
import FolderButton from './FolderButton'
import AudioTab from './AudioTab'
import RecordTab from './RecordTab'
import Container from '@material-ui/core/Container';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    height: "100%",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 50,
      width: '100%',
      height:'100%',
      backgroundColor: '#635ee7',
    },
  },
})(props => <Tabs {...props} centered TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    textAlign:"center",
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(3),
  },
  demo2: {
    backgroundColor: '#2e1534',
    //#282c34
  },
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Emotion Detection
            </Typography>
          </Toolbar>
        </AppBar>
          <div className={classes.demo2}>
            <StyledTabs value={value} onChange={handleChange}>
              <StyledTab label="Audio" />
              <StyledTab label="Record" />
            </StyledTabs>

            <SwipeableViews
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabContainer dir={theme.direction} >
                <AudioTab />
              </TabContainer>
              <TabContainer dir={theme.direction}><Voice className = "App-header"/></TabContainer>
            </SwipeableViews>
            <Typography className={classes.typography} />
          </div>
    </div>

  );
}
