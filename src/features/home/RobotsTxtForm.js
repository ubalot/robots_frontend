import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider } from 'material-ui';

export class RobotsTxtForm extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.state = {
      value: false
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    alert(this.state.value)
    event.preventDefault()
  }

  handleClear (event) {

  }

  render () {
    return (
      <div className="home-robots-txt-form">
        <Paper>
          <Card>
            <CardTitle
              title="Fill in, then press Submit"
              subtitle="All fields are necessary."
            />
            {/* <form onSubmit={this.handleSubmit}> */}
            <form>
              <TextField
                className="give-me-some-space"
                hintText="Domain"
                name="domain"
                underlineShow={true}
                onChange={this.handleChange}
              /><br />
              {/* <Divider /> */}
              <TextField
                className="give-me-some-space"
                hintText="Website url"
                name="websiteUrl"
                underlineShow={true}
              /><br />
              {/* <Divider /> */}
              <TextField
                className="give-me-some-space"
                hintText="RobotsTxt url"
                name="RobotsTxtUrl"
                underlineShow={true}
              />
              {/* <Divider /> */}
              <CardActions>
                <FlatButton label="Submit" onClick={this.handleSubmit} />
                <FlatButton label="Clear" onClick={this.handleClear} />
              </CardActions>
            </form>
          </Card>
        </Paper>
      </div>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RobotsTxtForm);
