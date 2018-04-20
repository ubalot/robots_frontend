import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, CardText } from 'material-ui';

import * as actions from './redux/actions';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    // children: PropTypes.node,
    common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    // children:
  };

  constructor(props) {
    super(props);

    this.textField = React.createRef();

    this.state = {
      input_url: '', // store text form value
      input_url_error: '', // store text form error
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  componentDidMount() {
    /* Auto-focus on TextField when component is ready
     * (it doesn't work when dev tools are open)
    */
    if (!this.props.home.readRobotsTxtContent) {
      this.textField.current.focus();
    }
  }

  handleSubmit() {
    const { backendServer } = this.props.common;

    const arg = `url=${this.state.input_url}`;
    const path = 'content';
    const robotsTxtUrl = `${backendServer}/${path}?${arg}`;

    this.props.actions.fetchRobotstxt(robotsTxtUrl)
      .then((res) => {
        if (res.data.success === 0) {
          this.setState({ input_url_error: res.data.message });
        }
      })
      .catch(err => console.log('fetchRobotsTxtERROR', err));
  }

  resetForm() {
    this.setState({ input_url: '', input_url_error: '' });
    this.textField.current.setState({ value: '' });
    this.textField.current.focus();
  }

  clearContent() {
    this.setState({ input_url: '' });
    this.props.actions.clearRobotstxt();
  }

  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <TextField
          ref={this.textField}
          className="give-me-some-space"
          hintText="insert robots.txt URL here"
          onChange={event => this.setState({ input_url: event.target.value })}
          value={this.state.input_url}
          errorText={this.state.input_url_error}
        />
        <CardActions>
          <FlatButton label="Submit" className="give-me-some-space" onClick={this.handleSubmit} />
          <FlatButton label="Cancel" className="read-robotstxt-buttons" onClick={this.resetForm} />
        </CardActions>
      </div>
    );
  }

  renderContent() {
    function renderRobotsTxtContent(robotsTxt) {
      const lines = robotsTxt.split('\n');

      const wrap = n => <div key={n}><br />{n}</div>;

      const renderedContent = lines.map((line) => {
        if (line.match(/^user(\s|-)?agent/i)) { // User-agent
          return wrap(<h5 className="user-agent">{line}</h5>);
        } else if (line.match(/^allow/i)) { // Allow rule
          return (<p className="allow" key={line}>{line}</p>);
        } else if (line.match(/^disallow/i)) { // Disallow rule
          return (<p className="disallow" key={line}>{line}</p>);
        } else if (line.match(/^sitemap/i)) { // Sitemap
          return wrap(<p className="sitemap">{line}</p>);
        } else if (line.match(/^#/)) { // Comment
          return (<p className="comment" key={line}>{line}</p>);
        }
        return (<p key={line}>{line}</p>);
      });

      return (<div>{renderedContent}</div>);
    }

    return (
      <div>
        <CardText>
          {renderRobotsTxtContent(this.props.home.readRobotsTxtContent)}
        </CardText>
        <CardActions>
          <FlatButton label="clear" onClick={this.clearContent} />
        </CardActions>
      </div>
    );
  }

  render() {
    return (
      <div className="home-read-robots-txt">
        <Paper>
          <Card>
            <CardTitle
              title="Get robots.txt content"
            />
            {this.props.home.readRobotsTxtContent ? this.renderContent() : this.renderForm()}
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
    home: state.home
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
)(ReadRobotsTxt);
