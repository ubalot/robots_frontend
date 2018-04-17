import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider, RaisedButton, CardText } from 'material-ui';
import * as actions from './redux/actions';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    children: PropTypes.node,
    common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    // input_url: '',
    // robots_txt: ''
  };

  constructor(props) {
    super(props);

    this.textField = React.createRef();

    // this.state = {
    //   input_url: ''
    // };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    // this.clearRobotstxt = this.clearRobotstxt.bind(this);
  }

  handleSubmit() {
    const { backendServer } = this.props.common;

    const arg = `url=${this.textField.current.input.value}`
    const robotsTxtUrl = `${backendServer}/content?${arg}`;
    // console.log('robotsTxtUrl', robotsTxtUrl)
    
    this.props.actions.fetchRobotstxt(robotsTxtUrl);
  }


  resetForm() {
    // this.setState({input_url: ''});

    // console.log('textField', this.textField.current.state)

    // const textField = document.getElementById('text-field')
    // this.textField.current.value = '';
    
    // this.textField.setState({value: ''})
    // this.textField.reset()
    // console.log('AAAA:', this.textField.state.value)
    this.textField.current.setState({value: ''})
    // this.setState({value: ''})
    // this.textField.setState({value: ''})
    this.textField.current.focus();

    // console.log('textField', this.textField.current.state)
  }

  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <form>
          <TextField
            // id="text-field"
            // ref={node => this.textField = node}
            ref={this.textField}
            className="give-me-some-space"
            hintText="insert robots.txt URL here"
            // onChange={event => this.setState({input_url: event.target.value})}
            onChange={event => this.textField.current.setState({value: event.target.value})}
            
            // errorText="Wrong url or page not found"
          />
          <CardActions>
            <FlatButton label="Submit" className="give-me-some-space" onClick={this.handleSubmit} />
            <FlatButton label="Cancel" className="read-robotstxt-buttons" onClick={this.resetForm} />
          </CardActions>
        </form>
      </div>
    );
  }

  renderContent() {
    return (
      <div>
        <CardText>
          {this.props.home.readRobotsTxtContent}
        </CardText>
        <CardActions>
          <FlatButton label="clear" onClick={this.props.actions.clearRobotstxt} />
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

  /* Auto-focus on TextField when component is ready 
   * (it doesn't work when dev tools are open)
   */
  componentDidMount() {
    this.textField.current.focus();
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
