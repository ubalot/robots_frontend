import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleNav from '../common/SimpleNav';
import routeConfig from '../../common/routeConfig';
import Header from '../common/Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.black,
    primary1Color: Colors.blue700,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA400,
    pickerHeaderColor: Colors.darkBlack
  }
});

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="home-app">
          <Header routes={routeConfig} />
          {/* <div className="sidebar">
            <SimpleNav routes={routeConfig} />
            <p className="memo">
              Above is a simple navigation tree for you to navigate between pages,
              it&apos;s generated from the route config so it will be auto updated
              when you add/remove features or pages.
            </p>
          </div>
          <div className="page-container">
            {this.props.children}
          </div> */}
          <div className="page-container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}