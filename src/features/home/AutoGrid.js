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

  /* Split children array in slice of 3 elements */
  renderGrid() {
    const { children } = this.props;
    const n = children.length;
    const result = [];
    for (let i = 0; i < n; i += 3) {
      result.push(
        <Grid container spacing={24}>
          <Grid item xs>{children[i]}</Grid>
          <Grid item xs>{i + 1 < n ? children[i + 1] : ''}</Grid>
          <Grid item xs>{i + 2 < n ? children[i + 2] : ''}</Grid>
        </Grid>
      );
    }
    return result;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="home-auto-grid">
        <div className={classes.root}>
          {this.renderGrid()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AutoGrid);
