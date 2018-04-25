import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_DELETE_ROBOT_TXT_BEGIN,
  HOME_DELETE_ROBOT_TXT_SUCCESS,
  HOME_DELETE_ROBOT_TXT_FAILURE,
  HOME_DELETE_ROBOT_TXT_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  deleteRobotTxt,
  dismissDeleteRobotTxtError,
  reducer,
} from 'src/features/home/redux/deleteRobotTxt';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deleteRobotTxt', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteRobotTxt succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteRobotTxt())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_DELETE_ROBOT_TXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_DELETE_ROBOT_TXT_SUCCESS);
      });
  });

  it('dispatches failure action when deleteRobotTxt fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteRobotTxt({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_DELETE_ROBOT_TXT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_DELETE_ROBOT_TXT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissDeleteRobotTxtError', () => {
    const expectedAction = {
      type: HOME_DELETE_ROBOT_TXT_DISMISS_ERROR,
    };
    expect(dismissDeleteRobotTxtError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_DELETE_ROBOT_TXT_BEGIN correctly', () => {
    const prevState = { deleteRobotTxtPending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ROBOT_TXT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteRobotTxtPending).to.be.true;
  });

  it('handles action type HOME_DELETE_ROBOT_TXT_SUCCESS correctly', () => {
    const prevState = { deleteRobotTxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ROBOT_TXT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteRobotTxtPending).to.be.false;
  });

  it('handles action type HOME_DELETE_ROBOT_TXT_FAILURE correctly', () => {
    const prevState = { deleteRobotTxtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ROBOT_TXT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteRobotTxtPending).to.be.false;
    expect(state.deleteRobotTxtError).to.exist;
  });

  it('handles action type HOME_DELETE_ROBOT_TXT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteRobotTxtError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_ROBOT_TXT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.deleteRobotTxtError).to.be.null;
  });
});
