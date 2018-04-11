import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider, RaisedButton } from 'material-ui';
import * as actions from './redux/actions';

const backendServer = 'http://127.0.0.1:8000';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    children: PropTypes.node,
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
          input_url: '',
          robots_txt: ''
      };
  }

  handleSubmit = () => {
    let arg = `url=${this.state.input_url}`;
    let getRobotsTxtContentUrl = `${backendServer}/content?${arg}`;
    
    fetch(getRobotsTxtContentUrl)
      .then(response => response.json())
      .then(text => this.setState({robots_txt: text}))
      .catch(error => console.error(error));
    
    console.log(this.state.robots_txt)
  }


  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <form>
          <div>
            <TextField
              hintText="insert robots.txt URL here"
              onChange={event => this.setState({input_url: event.target.value})}
            />
          </div>
          <div>
            <RaisedButton label="Submit" className="read-robotstxt-buttons" onClick={this.handleSubmit} />
            <RaisedButton label="Cancel" className="read-robotstxt-buttons" onClick={this.resetForm} />
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="home-read-robots-txt">
        <Paper>
          <Card>
            <CardTitle
              title="Get robots.txt content"
            />
            {this.renderForm()}
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
