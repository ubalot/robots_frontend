import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_ROBOTS_TXT_LIST_BEGIN,
  HOME_FETCH_ROBOTS_TXT_LIST_SUCCESS,
  HOME_FETCH_ROBOTS_TXT_LIST_FAILURE,
  HOME_FETCH_ROBOTS_TXT_LIST_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchRobotsTxtList,
  dismissFetchRobotsTxtListError,
  reducer,
} from 'src/features/home/redux/fetchRobotsTxtList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchRobotsTxtList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRobotsTxtList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobotsTxtList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRobotsTxtList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobotsTxtList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchRobotsTxtListError', () => {
    const expectedAction = {
      type: HOME_FETCH_ROBOTS_TXT_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchRobotsTxtListError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_LIST_BEGIN correctly', () => {
    const prevState = { fetchRobottxtsListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobottxtsListPending).to.be.true;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_LIST_SUCCESS correctly', () => {
    const prevState = { fetchRobottxtsListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobottxtsListPending).to.be.false;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_LIST_FAILURE correctly', () => {
    const prevState = { fetchRobottxtsListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobottxtsListPending).to.be.false;
    expect(state.fetchRobottxtsListError).to.exist;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRobottxtsListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobottxtsListError).to.be.null;
  });
});
