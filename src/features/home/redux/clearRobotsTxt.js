// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_CLEAR_ROBOTS_TXT,
} from './constants';

export function clearRobotsTxt() {
  return {
    type: HOME_CLEAR_ROBOTS_TXT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CLEAR_ROBOTS_TXT:
      return {
        ...state,
        readRobotsTxtContent: '',
        readRobotsTxtUrl: ''
      };

    default:
      return state;
  }
}
