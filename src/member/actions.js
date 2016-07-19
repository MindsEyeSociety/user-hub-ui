import { dispatch } from 'redux';
import { Map } from 'immutable';

import { Member, Members } from './models';
import { createDomain } from '../domain/actions';
import { setProfileId } from '../profile/actions';

export const REQUEST = 'member/REQUEST';
function request( id = 0 ) {
	return {
		type: REQUEST,
		payload: id
	};
}

export const RECEIVE = 'member/RECEIVE';
function receive( data ) {
	data = Object.assign( {}, data );
	let now = Date.now();
	data.lastUpdated = now;
	if ( data.orgUnit ) {
		data.orgUnit = data.orgUnit.id;
	}
	return {
		type: RECEIVE,
		id: data.id,
		payload: new Member( data ),
		receivedAt: now
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
		payload: new Members({
			lastUpdated: now,
			items: new Map( members )
		}),
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
		dispatch( request( id || 0 ) );
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
				dispatch( receive( json ) );
				if ( json.orgUnit ) {
					dispatch( createDomain( json.orgUnit ) );
				}
				if ( 'me' === id ) {
					dispatch( setProfileId( json.id ) );
				}
			}
		})
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchMember( state, id ) {
	const members = state.member;
	const member  = (
		members.items.get( id ) ||
		members.items.find( d => id === d.get( 'membershipNumber' ) )
	);

	if ( id && ( ! member || member.didInvalidate ) ) {
		return true;
	} else if ( ! id && ( ! member || ! member.isFetching ) ) {
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

export function fetchMembersIfNeeded() {
	return ( dispatch, getState ) => {
		if ( shouldFetchMember( getState() ) ) {
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
