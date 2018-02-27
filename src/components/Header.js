import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default class Header extends React.Component {
  constructor (props) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAddRobotsTxt = this.handleAddRobotsTxt.bind(this)
    this.handleReadRobotsTxt = this.handleReadRobotsTxt.bind(this)

    this.state = {
      open: false
    }
  }

  // handleToggle = () => this.setState({open: !this.state.open})
  handleToggle () {
    this.setState({open: !this.state.open})
  }

  // handleClose = () => this.setState({open: false})
  handleClose () {
    this.setState({open: false})
  }

  handleAddRobotsTxt () {
    this.setState({open: false})
  }

  handleReadRobotsTxt () {

  }

  render () {
    return (
      <AppBar
        title="Title"
        onLeftIconButtonClick={this.handleToggle}
      >
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>Home</MenuItem>
          <MenuItem onClick={this.handleReadRobotsTxt}>Read RobotsTxt</MenuItem>
          <MenuItem onClick={this.handleAddRobotsTxt}>Add RobotsTxt</MenuItem>
        </Drawer>
      </AppBar>
    )
  }
}
