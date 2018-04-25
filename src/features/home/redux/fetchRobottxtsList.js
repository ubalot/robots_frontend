import axios from 'axios';
import {
  HOME_FETCH_ROBOTTXTS_LIST_BEGIN,
  HOME_FETCH_ROBOTTXTS_LIST_SUCCESS,
  HOME_FETCH_ROBOTTXTS_LIST_FAILURE,
  HOME_FETCH_ROBOTTXTS_LIST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchRobottxtsList(endpoint = '') {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_ROBOTTXTS_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      // doRequest.then(
      axios.get(endpoint).then(
        (res) => {
          console.log('RES', res);
          console.log('res.data', res.data);
          console.log('res.data.data', res.data.data);
          console.log('websites', res.data.data.websites);
          dispatch({
            type: HOME_FETCH_ROBOTTXTS_LIST_SUCCESS,
            data: res.data.data.websites,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_ROBOTTXTS_LIST_FAILURE,
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
export function dismissFetchRobottxtsListError() {
  return {
    type: HOME_FETCH_ROBOTTXTS_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_ROBOTTXTS_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRobottxtsListPending: true,
        fetchRobottxtsListError: null,
      };

    case HOME_FETCH_ROBOTTXTS_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchRobottxtsListPending: false,
        fetchRobottxtsListError: null,
        robottxtsList: action.data
      };

    case HOME_FETCH_ROBOTTXTS_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRobottxtsListPending: false,
        fetchRobottxtsListError: action.data.error,
      };

    case HOME_FETCH_ROBOTTXTS_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRobottxtsListError: null,
      };

    default:
      return state;
  }
}
