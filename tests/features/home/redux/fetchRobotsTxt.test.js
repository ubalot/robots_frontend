import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_ROBOTS_TXT_BEGIN,
  HOME_FETCH_ROBOTS_TXT_SUCCESS,
  HOME_FETCH_ROBOTS_TXT_FAILURE,
  HOME_FETCH_ROBOTS_TXT_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchRobotsTxt,
  dismissFetchRobotsTxtError,
  reducer,
} from 'src/features/home/redux/fetchRobotsTxt';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchRobotsTxt', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRobotsTxt succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobotsTxt())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRobotsTxt fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobotsTxt({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTS_TXT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchRobotsTxtError', () => {
    const expectedAction = {
      type: HOME_FETCH_ROBOTS_TXT_DISMISS_ERROR,
    };
    expect(dismissFetchRobotsTxtError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_BEGIN correctly', () => {
    const prevState = { fetchRobotstxtPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.true;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_SUCCESS correctly', () => {
    const prevState = { fetchRobotstxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.false;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_FAILURE correctly', () => {
    const prevState = { fetchRobotstxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.false;
    expect(state.fetchRobotstxtError).to.exist;
  });

  it('handles action type HOME_FETCH_ROBOTS_TXT_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRobotstxtError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTS_TXT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtError).to.be.null;
  });
});
