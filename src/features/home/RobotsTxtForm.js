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
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.textField = new React.createRef();

    this.state = {
      inputUrl: '',
      inputUrlError: ''
    };
  }

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

    this.props.actions.addRobotstxtToDb(url, args)
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
                  document.getElementById('submit-button').click();
                }
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              id="submit-button"
              variant="raised"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="raised"
              size="small"
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
