import { expect } from 'chai';

import {
  HOME_ADD_READ_ROBOTS_TXT,
} from 'src/features/home/redux/constants';

import {
  addReadRobotsTxt,
  reducer,
} from 'src/features/home/redux/addReadRobotsTxt';

describe('home/redux/addReadRobotsTxt', () => {
  it('returns correct action by addReadRobotsTxt', () => {
    expect(addReadRobotsTxt()).to.have.property('type', HOME_ADD_READ_ROBOTS_TXT);
  });

  it('handles action type HOME_ADD_READ_ROBOTS_TXT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_ADD_READ_ROBOTS_TXT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
