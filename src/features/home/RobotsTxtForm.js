import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  TextField,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from 'material-ui';
import * as actions from './redux/actions';

export class RobotsTxtForm extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    pageTitle: 'Add robots.txt to database',
  }

  state = {
    inputUrl: '',
    inputUrlError: ''
  };

  componentDidMount() {
    this.props.actions.changePageTitle(this.props.pageTitle);
  }

  textField = new React.createRef();

  handleChange = (event) => {
    this.setState({
      inputUrl: event.target.value,
      inputUrlError: ''
    });
  }

  handleSubmit = () => {
    const { backendServer } = this.props.common;

    const args = { url: this.state.inputUrl };
    const path = 'scraper/website';
    const url = `${backendServer}/${path}`;

    this.props.actions.addRobottxtToDb(url, args)
      .then((res) => {
        if (res.data.success === 0) {
          this.setState({ inputUrlError: res.data.message });
        }
      })
      .catch(err => this.setState({ inputUrlError: err.errorText }));
  }

  handleClear = () => {
    this.setState({
      inputUrl: '',
      inputUrlError: ''
    });
    this.textField.focus();
  }

  render() {
    return (
      <div className="home-robots-txt-form">
        <Card className="card" raised>
          <CardContent>
            <Typography variant="headline" component="h3">
              Add a robots.txt url to database.
            </Typography>
            <TextField
              inputRef={(node) => { this.textField = node; }}
              autoFocus
              required
              margin="normal"
              name="input_url"
              placeholder="robots.txt url"
              onChange={this.handleChange}
              value={this.state.inputUrl}
              helperText={this.state.inputUrlError}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  this.handleSubmit();
                }
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleClear}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
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
