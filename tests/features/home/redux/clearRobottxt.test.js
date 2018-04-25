import { expect } from 'chai';

import {
  HOME_CLEAR_ROBOTTXT,
} from 'src/features/home/redux/constants';

import {
  clearRobottxt,
  reducer,
} from 'src/features/home/redux/clearRobottxt';

describe('home/redux/clearRobottxt', () => {
  it('returns correct action by clearRobottxt', () => {
    expect(clearRobottxt()).to.have.property('type', HOME_CLEAR_ROBOTTXT);
  });

  it('handles action type HOME_CLEAR_ROBOTTXT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLEAR_ROBOTTXT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
