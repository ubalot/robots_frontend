import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_ADD_ROBOTSTXT_TO_DB_BEGIN,
  HOME_ADD_ROBOTSTXT_TO_DB_SUCCESS,
  HOME_ADD_ROBOTSTXT_TO_DB_FAILURE,
  HOME_ADD_ROBOTSTXT_TO_DB_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  addRobotstxtToDb,
  dismissAddRobotstxtToDbError,
  reducer,
} from 'src/features/home/redux/addRobotstxtToDb';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addRobotstxtToDb', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addRobotstxtToDb succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addRobotstxtToDb())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_ROBOTSTXT_TO_DB_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_ROBOTSTXT_TO_DB_SUCCESS);
      });
  });

  it('dispatches failure action when addRobotstxtToDb fails', () => {
    const store = mockStore({});

    return store.dispatch(addRobotstxtToDb({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_ROBOTSTXT_TO_DB_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_ROBOTSTXT_TO_DB_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissAddRobotstxtToDbError', () => {
    const expectedAction = {
      type: HOME_ADD_ROBOTSTXT_TO_DB_DISMISS_ERROR,
    };
    expect(dismissAddRobotstxtToDbError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_ADD_ROBOTSTXT_TO_DB_BEGIN correctly', () => {
    const prevState = { addRobotstxtToDbPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ROBOTSTXT_TO_DB_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addRobotstxtToDbPending).to.be.true;
  });

  it('handles action type HOME_ADD_ROBOTSTXT_TO_DB_SUCCESS correctly', () => {
    const prevState = { addRobotstxtToDbPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ROBOTSTXT_TO_DB_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addRobotstxtToDbPending).to.be.false;
  });

  it('handles action type HOME_ADD_ROBOTSTXT_TO_DB_FAILURE correctly', () => {
    const prevState = { addRobotstxtToDbPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ROBOTSTXT_TO_DB_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addRobotstxtToDbPending).to.be.false;
    expect(state.addRobotstxtToDbError).to.exist;
  });

  it('handles action type HOME_ADD_ROBOTSTXT_TO_DB_DISMISS_ERROR correctly', () => {
    const prevState = { addRobotstxtToDbError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ROBOTSTXT_TO_DB_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addRobotstxtToDbError).to.be.null;
  });
});
