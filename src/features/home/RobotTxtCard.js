import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import red from 'material-ui/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RobotTxtCard extends Component {
  static propTypes = {
    website: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="home-robot-txt-card">
        <Card className={classes.card}>
          <CardHeader
            title={this.props.website.robot_url}
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                ID: {this.props.website.id}
              </Typography>
              <Typography paragraph>
                domain: {this.props.website.domain}
              </Typography>
              <Typography paragraph>
                website_url: {this.props.website.website_url},
              </Typography>
              <Typography paragraph>
                robot_url: {this.props.website.robot_url}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(RobotTxtCard);
