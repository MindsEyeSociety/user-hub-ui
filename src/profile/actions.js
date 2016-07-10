import { dispatch } from 'redux';
import Profile from './models';

export const FETCH   = 'profile/UPDATE';
export const RECEIVE = 'profile/RECEIVE';
export const ERROR   = 'profile/ERROR';

export const fetch = () => ({
	type: FETCH
});

export const receive = data => ({
	type: RECEIVE,
	payload: new Profile( data )
});

export const error = err => ({
	type: ERROR,
	payload: err
});
