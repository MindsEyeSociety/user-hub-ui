import { dispatch } from 'redux';
import { Domain, Domains } from './models';
import { Map, List } from 'immutable';

export const REQUEST = 'domain/REQUEST';
function request( id = 0 ) {
	return {
		type: REQUEST,
		payload: id
	};
}

export const RECEIVE = 'domain/RECEIVE';
function receive( data ) {
	let now = Date.now();
	let domain = data.unit;

	domain.lastUpdated = now;
	domain.users    = new List( domain.users.map( m => m.id ) );
	domain.offices  = new List( domain.offices.map( m => m.id ) );
	domain.parents  = new List( data.parents.map( m => m.id ) );
	domain.children = new List( data.children.map( m => m.id ) );

	return {
		type: RECEIVE,
		id: domain.id,
		payload: new Domain( domain ),
		receivedAt: now
	};
}

export const RECEIVE_MANY = 'domain/RECEIVE_MANY';
function receiveMany( data ) {
	let now = Date.now();
	let domains = data
	.map( d => {
		d.lastUpdated = now;
		return d;
	})
	.map( d => [ d.id, new Domain( d ) ] );

	return {
		type: RECEIVE_MANY,
		payload: new Domains({
			lastUpdated: now,
			items: new Map( domains )
		}),
		receivedAt: now
	};
}

export const ERROR = 'domain/ERROR';
function error( err ) {
	return {
		type: ERROR,
		payload: err
	};
}

function fetchDomain( id = '' ) {
	return dispatch => {
		dispatch( request( id || 0 ) );
		return fetch( 'http://localhost:3000/v1/org-unit/' + id + '?token=DEV' )
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
				return dispatch( receive( json ) );
			}
		})
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchDomain( state, id ) {
	const domains = state.domain;
	const domain  = domains.items[ id ];
	if ( id && ( ! domain || ! domain.isFetching ) ) {
		return true;
	} else if ( ! id && ( ! domains || ! domains.isFetching ) ) {
		return true;
	} else {
		return false;
	}
}

export function fetchDomainIfNeeded( id ) {
	return ( dispatch, getState ) => {
		if ( shouldFetchDomain( getState(), id ) ) {
			return dispatch( fetchDomain( id ) );
		} else {
			return Promise.resolve();
		}
	};
}

export function fetchDomainsIfNeeded() {
	return ( dispatch, getState ) => {
		if ( shouldFetchDomain( getState() ) ) {
			return dispatch( fetchDomain() );
		} else {
			return Promise.resolve();
		}
	};
}
