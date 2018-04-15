import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider, RaisedButton, CardText } from 'material-ui';
import * as actions from './redux/actions';

const backendServer = 'http://127.0.0.1:8000';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    children: PropTypes.node,
    // common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    // robots_txt: PropTypes.string,
  };

  static defaultProps = {
    // input_url: '',
    // robots_txt: ''
  };

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         input_url: '',
  //         robots_txt: ''
  //     };
  // }

  handleSubmit = () => {
    let arg = `url=${this.state.input_url}`;
    let robotsTxtUrl = `${backendServer}/content?${arg}`;
    
    // fetch(robotsTxtUrl)
    //   .then(response => reshttps://www.google.com/robots.txtponse.json())
    //   .then(text => this.setState({robots_txt: text}))
    //   // .then(text => this.props.robots_txt = text)
    //   .catch(error => console.error(error));https://www.google.com/robots.txt
    
    // // let robotstxtContent = '';
    // let robotstxtContent = axios.get(robotsTxtUrl)
    //   // .then(res => this.setState({robots_txt: res.data.data.data}))
    //   // .then(res => {console.log('res',res.data.data); /*robotstxtContent = res.data.data*/})
    //   .then(res => {
    //     dispatch({
    //       type: HOME_ADD_READ_ROBOTS_TXT,
    //       text: res.data.data
    //     })
    //   })
    //   // .catch(error => console.error(error));
    
    // console.log('robotstxtContent', robotstxtContent)
    // console.log('res', res)
    // console.log('robots_txt', typeof this.state.robots_txt, this.state.robots_txt)
    // console.log('COMMON', this.state.robots_txt);

    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList, fetchRobotstxt /*, addReadRobotsTxt */ } = this.props.actions;
    // let test = robotstxtContent//'CIAO'
    // addReadRobotsTxt(test);
    console.log('PRIMA DI fetchRobotstxt')
    fetchRobotstxt(robotsTxtUrl)
    console.log('RES', res)
  }


  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <form>
          <div>
            <TextField
              hintText="insert robots.txt URL here"
              onChange={event => this.setState({input_url: event.target.value})}
              // onChange={event => this.props.input_url = event.target.value}
            />
          </div>
          <div>
            <RaisedButton label="Submit" className="read-robotstxt-buttons" onClick={this.handleSubmit} />
            <RaisedButton label="Cancel" className="read-robotstxt-buttons" onClick={this.resetForm} />
          </div>
        </form>
      </div>
    );
  }

  renderContent() {
    return (
      <CardText>
        {this.props.home.readRobotsTxtContent}
      </CardText>
    );
  }

  render() {
    // const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.common;
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList, fetchRobotstxt /*, addReadRobotsTxt */ } = this.props.actions;
    return (
      <div className="home-read-robots-txt">
        <Paper>
          <Card>
            <CardTitle
              title="Get robots.txt content"
            />
            {console.log('CONTENT', this.props.home.readRobotsTxtContent) }
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
    // common: state.common,
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
