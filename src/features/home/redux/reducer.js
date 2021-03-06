// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.


import initialState from './initialState';
import { reducer as fetchRobotsTxtReducer } from './fetchRobotsTxt';
import { reducer as clearRobotsTxtReducer } from './clearRobotsTxt';
import { reducer as addRobottxtToDbReducer } from './addRobottxtToDb';
import { reducer as changePageTitleReducer } from './changePageTitle';
import { reducer as fetchRobotsTxtListReducer } from './fetchRobotsTxtList';
import { reducer as deleteRobotsTxtReducer } from './deleteRobotsTxt';

const reducers = [
  fetchRobotsTxtReducer,
  clearRobotsTxtReducer,
  addRobottxtToDbReducer,
  changePageTitleReducer,
  fetchRobotsTxtListReducer,
  deleteRobotsTxtReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
