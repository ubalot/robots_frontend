import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from 'material-ui/styles';
import {
  indigo,
  pink,
  red } from 'material-ui/colors';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Drawer,
  AppBar,
  Toolbar,
  Hidden,
  MenuItem,
  Typography,
  Divider,
  IconButton
} from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import * as actions from './redux/actions';
import routeConfig from '../../common/routeConfig';

// All the following keys are optional.
// We try our best to provide a great default value.
const muiTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

/*
  This is the root componehttp://localhost:6075/default-pagent of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    common: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: 'No content.',
  };

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderLinks(items, basePath = '') {
    return (
      <div>
        {items.reduce((prev, item) => {
          if (item.autoIndexRoute || item.name === 'Page not found') {
            return prev;
          }

          const path = (() => {
            if (/^\//.test(item.path)) {
              return item.path;
            } else if (basePath === '/') {
              return `/${item.path}`;
            }
            return `${basePath}/${item.path}`;
          })();
          // console.log(path)
          prev.push(<div key={path}><Link href={path} to={path}><MenuItem>{item.name || item.path}</MenuItem></Link></div>);

          if (item.childRoutes && item.childRoutes.length) {
            prev.push(<div key={`${path}_wrapper`}>{this.renderLinks(item.childRoutes, path)}</div>);
          }
          return prev;
        }, [])}
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="home-app">
        <MuiThemeProvider theme={muiTheme}>
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  {this.props.common.appPage}
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <div className={classes.toolbar} />
                <Divider />
                {this.renderLinks(this.props.routes[0].childRoutes)}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.toolbar} />
                <Divider />
                {this.renderLinks(this.props.routes[0].childRoutes)}
              </Drawer>
            </Hidden>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {this.props.children}
            </main>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    routes: routeConfig
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
