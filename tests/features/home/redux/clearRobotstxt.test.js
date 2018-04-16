import { expect } from 'chai';

import {
  HOME_CLEAR_ROBOTSTXT,
} from 'src/features/home/redux/constants';

import {
  clearRobotstxt,
  reducer,
} from 'src/features/home/redux/clearRobotstxt';

describe('home/redux/clearRobotstxt', () => {
  it('returns correct action by clearRobotstxt', () => {
    expect(clearRobotstxt()).to.have.property('type', HOME_CLEAR_ROBOTSTXT);
  });

  it('handles action type HOME_CLEAR_ROBOTSTXT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLEAR_ROBOTSTXT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
