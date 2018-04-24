import React, { PureComponent } from 'react';

export default class PageNotFound extends PureComponent {
  // componentDidMount() {
  //   this.props.actions.changePageTitle('Page not found');
  // }

  render() {
    return (
      <div className="common-page-not-found">
        Page not found.<br />404
      </div>
    );
  }
}
