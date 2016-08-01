import { dispatch } from 'redux';
import { Map } from 'immutable';

import { Member, Members } from './models';
import { createDomain } from '../domain';
import { setProfileId } from '../profile';

export const REQUEST = 'member/REQUEST';
function request( id ) {
	return {
		type: REQUEST,
		id
	};
}

export const RECEIVE = 'member/RECEIVE';
function receive( data, id ) {
	data = Object.assign( {}, data );
	let now = Date.now();
	data.lastUpdated = now;
	if ( data.orgUnit ) {
		data.orgUnit = data.orgUnit.id;
	}
	return {
		type: RECEIVE,
		id: id,
		payload: new Member( data ),
		receivedAt: now
	};
}

export const REQUEST_MANY = 'member/REQUEST_MANY';
function requestMany() {
	return {
		type: REQUEST_MANY
	};
}

export const RECEIVE_MANY = 'member/RECEIVE_MANY';
function receiveMany( data ) {
	let now = Date.now();
	let members = data
	.map( d => {
		d.lastUpdated = now;
		return d;
	})
	.map( d => [ d.id, new Member( d ) ] );

	return {
		type: RECEIVE_MANY,
		payload: new Map( members ),
		receivedAt: now
	};
}

export const ERROR = 'member/ERROR';
function error( err ) {
	return {
		type: ERROR,
		payload: err,
		stack: err.stack
	};
}

function fetchMember( id = '' ) {
	return dispatch => {
		if ( id ) {
			dispatch( request( id ) );
		} else {
			dispatch( requestMany() );
		}
		return fetch( 'http://localhost:3000/v1/user/' + id + '?token=DEV' )
		.then( response => {
			if ( 200 !== response.status ) {
				throw new Error( 'Invalid status found: ' + response.status );
			}
			return response.json();
		})
		.then( json => {
			if ( Array.isArray( json ) ) {
				return dispatch( receiveMany( json ) );
			} else {
				dispatch( receive( json, id ) );
				if ( json.orgUnit ) {
					dispatch( createDomain( json.orgUnit ) );
				}
				if ( 'me' === id ) {
					dispatch( setProfileId( json.id, json.firstName ) );
				}
			}
		})
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchMember( state, id ) {
	const members = state.member;

	if ( 'me' === id ) {
		id = state.profile.get( 'id' );
	}

	const member  = (
		members.items.get( id ) ||
		members.items.find( d => id === d.get( 'membershipNumber' ) )
	);

	if ( ! member ) {
		return true;
	} else if ( member.isFetching ) {
		return false;
	} else if ( member.didInvalidate ) {
		return true;
	} else {
		return false;
	}
}

export function fetchMemberIfNeeded( id ) {
	return ( dispatch, getState ) => {
		if ( shouldFetchMember( getState(), id ) ) {
			return dispatch( fetchMember( id ) );
		} else {
			return Promise.resolve();
		}
	};
}

function shouldFetchMembers( state ) {
	const members = state.member;

	if ( ! members.isFetching ) {
		return true;
	} else {
		return false;
	}
}

export function fetchMembersIfNeeded() {
	return ( dispatch, getState ) => {
		if ( shouldFetchMembers( getState() ) ) {
			return dispatch( fetchMember() );
		} else {
			return Promise.resolve();
		}
	};
}

export function createMembersForDomain( data, domainId ) {
	return dispatch => {
		let members = data.map( m => {
			m.orgUnit = domainId;
			return m;
		});
		dispatch( receiveMany( members ) );
	};
}
