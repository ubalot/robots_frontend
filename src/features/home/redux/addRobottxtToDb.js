import axios from 'axios';

import {
  HOME_ADD_ROBOTTXT_TO_DB_BEGIN,
  HOME_ADD_ROBOTTXT_TO_DB_SUCCESS,
  HOME_ADD_ROBOTTXT_TO_DB_FAILURE,
  HOME_ADD_ROBOTTXT_TO_DB_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addRobottxtToDb(url = '', args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_ADD_ROBOTTXT_TO_DB_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      const querystring = require('querystring');
      const data = querystring.stringify(args);
      axios.post(url, data).then(
        (res) => {
          dispatch({
            type: HOME_ADD_ROBOTTXT_TO_DB_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_ADD_ROBOTTXT_TO_DB_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddRobottxtToDbError() {
  return {
    type: HOME_ADD_ROBOTTXT_TO_DB_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_ROBOTTXT_TO_DB_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addRobottxtToDbPending: true,
        addRobottxtToDbError: null,
      };

    case HOME_ADD_ROBOTTXT_TO_DB_SUCCESS:
      // The request is success
      return {
        ...state,
        addRobottxtToDbPending: false,
        addRobottxtToDbError: null,
      };

    case HOME_ADD_ROBOTTXT_TO_DB_FAILURE:
      // The request is failed
      return {
        ...state,
        addRobottxtToDbPending: false,
        addRobottxtToDbError: action.data.error,
      };

    case HOME_ADD_ROBOTTXT_TO_DB_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addRobottxtToDbError: null,
      };

    default:
      return state;
  }
}
