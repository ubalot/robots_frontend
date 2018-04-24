import { expect } from 'chai';

import {
  HOME_CHANGE_PAGE_TITLE,
} from 'src/features/home/redux/constants';

import {
  changePageTitle,
  reducer,
} from 'src/features/home/redux/changePageTitle';

describe('home/redux/changePageTitle', () => {
  it('returns correct action by changePageTitle', () => {
    expect(changePageTitle()).to.have.property('type', HOME_CHANGE_PAGE_TITLE);
  });

  it('handles action type HOME_CHANGE_PAGE_TITLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_PAGE_TITLE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
