import { dispatch } from 'redux';
import { Profile } from './models';

export const REQUEST = 'profile/REQUEST';
function request() {
	return {
		type: REQUEST
	};
}

export const RECEIVE = 'profile/RECEIVE';
function receive( data ) {
	return {
		type: RECEIVE,
		payload: new Profile( data ),
		receivedAt: Date.now()
	};
}

export const ERROR = 'profile/ERROR';
function error( err ) {
	return {
		type: ERROR,
		payload: err
	};
}

function fetchProfile() {
	return dispatch => {
		dispatch( request() );
		return fetch( 'http://localhost:3000/v1/user/me?token=DEV' )
		.then( response => response.json() )
		.then( json => dispatch( receive( json ) ) )
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchProfile( state ) {
	const profile = state.profile;
	if ( ! profile || ! profile.isFetching ) {
		return true;
	} else {
		return false;
	}
}

export function fetchProfileIfNeeded() {
	return ( dispatch, getState ) => {
		if ( shouldFetchProfile( getState() ) ) {
			return dispatch( fetchProfile() );
		} else {
			return Promise.resolve();
		}
	};
}
