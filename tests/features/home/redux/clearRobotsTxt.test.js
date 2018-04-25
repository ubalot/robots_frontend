import { expect } from 'chai';

import {
  HOME_CLEAR_ROBOTS_TXT,
} from 'src/features/home/redux/constants';

import {
  clearRobotsTxt,
  reducer,
} from 'src/features/home/redux/clearRobotsTxt';

describe('home/redux/clearRobotsTxt', () => {
  it('returns correct action by clearRobotsTxt', () => {
    expect(clearRobotsTxt()).to.have.property('type', HOME_CLEAR_ROBOTS_TXT);
  });

  it('handles action type HOME_CLEAR_ROBOTS_TXT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLEAR_ROBOTS_TXT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
