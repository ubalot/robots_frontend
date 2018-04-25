import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_ROBOTTXT_BEGIN,
  HOME_FETCH_ROBOTTXT_SUCCESS,
  HOME_FETCH_ROBOTTXT_FAILURE,
  HOME_FETCH_ROBOTTXT_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchRobottxt,
  dismissFetchRobottxtError,
  reducer,
} from 'src/features/home/redux/fetchRobottxt';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchRobottxt', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRobottxt succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobottxt())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTTXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTTXT_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRobottxt fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRobottxt({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ROBOTTXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ROBOTTXT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchRobottxtError', () => {
    const expectedAction = {
      type: HOME_FETCH_ROBOTTXT_DISMISS_ERROR,
    };
    expect(dismissFetchRobottxtError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_ROBOTTXT_BEGIN correctly', () => {
    const prevState = { fetchRobotstxtPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTTXT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.true;
  });

  it('handles action type HOME_FETCH_ROBOTTXT_SUCCESS correctly', () => {
    const prevState = { fetchRobotstxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTTXT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.false;
  });

  it('handles action type HOME_FETCH_ROBOTTXT_FAILURE correctly', () => {
    const prevState = { fetchRobotstxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTTXT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtPending).to.be.false;
    expect(state.fetchRobotstxtError).to.exist;
  });

  it('handles action type HOME_FETCH_ROBOTTXT_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRobotstxtError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ROBOTTXT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchRobotstxtError).to.be.null;
  });
});
