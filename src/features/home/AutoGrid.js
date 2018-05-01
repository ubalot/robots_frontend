import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class AutoGrid extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="home-auto-grid">
        <div className={classes.root}>
          <Grid container spacing={24}>
            {this.props.children.map((child, i) => <Grid item xs key={`grid_item_${i}`}>{child}</Grid>)}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AutoGrid);
