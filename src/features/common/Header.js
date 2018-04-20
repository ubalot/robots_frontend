import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Drawer, MenuItem } from 'material-ui';


export default class Header extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    // This binding is necessary to make 'this' work in the callback
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddRobotsTxt = this.handleAddRobotsTxt.bind(this);
    this.handleReadRobotsTxt = this.handleReadRobotsTxt.bind(this);

    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleAddRobotsTxt() {
    this.setState({ open: false })
  }

  handleReadRobotsTxt() {

  }

  renderLinks(items, basePath) {
    return (
      <div>
        {items.reduce((prev, item) => {
          if (item.autoIndexRoute || item.name === 'Page not found') {
            return prev;
          }
          let path;
          if (/^\//.test(item.path)) {
            path = item.path;
          } else if (basePath === '/') {
            path = `/${item.path}`;
          } else {
            path = `${basePath}/${item.path}`;
          }
          prev.push(<div key={path}><Link to={path}><MenuItem>{item.name || item.path}</MenuItem></Link></div>);

          if (item.childRoutes && item.childRoutes.length) {
            prev.push(<div key={`${path}_wrapper`}>{this.renderLinks(item.childRoutes, path)}</div>)
          }
          return prev;
        }, [])}
      </div>
    )
  }

  render() {
    return (
      <div className="common-header">
        <AppBar
          title="Title"
          onLeftIconButtonClick={this.handleToggle}
        >
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => { this.setState({ open }); }}
          >
          {this.renderLinks(this.props.routes[0].childRoutes, '')}
          </Drawer>
        </AppBar>
      </div>
    );
  }
}
