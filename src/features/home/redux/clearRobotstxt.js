// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_CLEAR_ROBOTSTXT,
} from './constants';

export function clearRobotstxt() {
  return {
    type: HOME_CLEAR_ROBOTSTXT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CLEAR_ROBOTSTXT:
      return {
        ...state,
        readRobotsTxtContent: '',
        readRobotsTxtUrl: ''
      };

    default:
      return state;
  }
}
