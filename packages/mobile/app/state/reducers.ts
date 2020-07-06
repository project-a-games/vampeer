import { Reducer } from 'redux';
import { produce } from 'immer';
import { VampeerState, initialState } from './app_state';
import {
    receiveCredentials, updateTheme, recieveUserData,
} from './app_actions';
import { Action } from './tools/actions';

/* eslint-disable no-param-reassign */

const receiveData = produce((draft: VampeerState, action: Action<any>) => {
    if (receiveCredentials.is(action)) {
        draft.credentials = action.payload;
    } else if (recieveUserData.is(action)) {
        draft.userData = action.payload;
    }
});

const updateState = produce((draft: VampeerState, action: Action<any>) => {
    if (updateTheme.is(action)) {
        draft.theme = action.payload;
    }
});

const reducers = [receiveData, updateState];

export const mainReducer: Reducer<VampeerState, Action<any>> = (state: VampeerState | undefined, action: Action<any>) => {
    console.log(`Running Reducers for ${action.type}`);
    if (!state) {
        return initialState;
    }

    let newState = state;
    reducers.forEach((reducer) => {
        newState = reducer(newState, action);
    });

    state !== newState && console.log(
        `State updated from ${JSON.stringify(state, null, 2)} to ${JSON.stringify(newState, null, 2)}`,
    );

    return newState;
};
