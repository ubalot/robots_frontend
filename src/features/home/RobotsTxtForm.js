import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton } from 'material-ui';
import * as actions from './redux/actions';

export class RobotsTxtForm extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    // home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.textField = new React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);

    this.state = {
      input_url: ''
    };
  }

  handleChange(event) {
    this.setState({ input_url: event.target.value });
  }

  handleSubmit() {
    // alert(this.state.input_url);
    // event.preventDefault();
    const { backendServer } = this.props.common;

    // const arg = `url=${this.textField.current.input.value}`
    const args = { url: this.state.input_url };
    console.log('SUBMIT ARGS', args);
    const path = 'scraper/website';
    const url = `${backendServer}/${path}`;

    this.props.actions.addRobotstxtToDb(url, args)
      .then((res) => {
        // console.log('fetchRobotsTxt', res)
        if (res.data.success === 0) {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log('fetchRobotsTxtERROR', err));
  }

  handleClear() {
    this.setState({ input_url: '' });
    this.textField.current.focus();
  }

  render() {
    return (
      <div className="home-robots-txt-form">
        <Paper>
          <Card>
            {/* <CardTitle
              title="Fill in, then press Submit"
              subtitle="All fields are necessary."
            /> */}
            <CardTitle
              title="Add robots.txt url to database."
              subtitle=""
            />
            <TextField
              ref={this.textField}
              className="give-me-some-space"
              hintText="Domain"
              name="domain"
              // underlineShow={true}
              onChange={this.handleChange}
              value={this.state.input_url}
            />
            <CardActions>
              <FlatButton label="Submit" onClick={this.handleSubmit} />
              <FlatButton label="Clear" onClick={this.handleClear} />
            </CardActions>
            {/* <form onSubmit={this.handleSubmit}> */}
            {/* <form>
              <TextField
                className="give-me-some-space"
                hintText="Domain"
                name="domain"
                underlineShow={true}
                onChange={this.handleChange}
              /><br />
              <TextField
                className="give-me-some-space"
                hintText="Website url"
                name="websiteUrl"
                underlineShow={true}
              /><br />
              <TextField
                className="give-me-some-space"
                hintText="RobotsTxt url"
                name="RobotsTxtUrl"
                underlineShow={true}
              />
              <CardActions>
                <FlatButton label="Submit" onClick={this.handleSubmit} />
                <FlatButton label="Clear" onClick={this.handleClear} />
              </CardActions>
            </form> */}
          </Card>
        </Paper>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
