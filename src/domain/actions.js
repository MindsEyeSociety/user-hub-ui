import { dispatch } from 'redux';
import { Map, List } from 'immutable';

import { Domain, Domains } from './models';
import { api } from '../shared';
import { createMembersForDomain } from '../member';

export const REQUEST = 'domain/REQUEST';
function request( id ) {
	return {
		type: REQUEST,
		id
	};
}

export const RECEIVE = 'domain/RECEIVE';
function receive( data, id ) {
	let now = Date.now();
	let domain = Object.assign( {}, data.unit );

	domain.lastUpdated   = now;
	domain.didInvalidate = false;
	domain.members       = new List( domain.users.map( m => m.id ) );
	domain.offices       = new List( domain.offices.map( m => m.id ) );
	domain.parents       = new List( data.parents.map( m => m.id ) );
	domain.children      = new List( data.children.map( m => m.id ) );

	delete domain.users;

	return {
		type: RECEIVE,
		id: id,
		payload: new Domain( domain ),
		receivedAt: now
	};
}

export const REQUEST_MANY = 'domain/REQUEST_MANY';
function requestMany() {
	return {
		type: REQUEST_MANY
	};
}

export const RECEIVE_MANY = 'domain/RECEIVE_MANY';
function receiveMany( data ) {
	let mapDomain = domain => {
		domain.lastUpdated = Date.now();
		domain.didInvalidate = true;
		if ( domain.children ) {
			domain.children = new List( domain.children.map( d => d.id ) );
		}
		return [ domain.id, new Domain( domain ) ];
	};

	return {
		type: RECEIVE_MANY,
		payload: new Map( data.map( mapDomain ) ),
		receivedAt: Date.now()
	};
}

export const CREATE = 'domain/CREATE';
function create( domain ) {
	domain.lastUpdated = Date.now();
	domain.didInvalidate = true;
	return {
		type: CREATE,
		id: domain.id,
		payload: new Domain( domain ),
		receivedAt: Date.now()
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
		if ( id ) {
			dispatch( request( id ) );
		} else {
			dispatch( requestMany() );
		}
		return api.get( '/org-unit/' + id )
		.then( json => {
			if ( Array.isArray( json ) ) {
				return dispatch( receiveMany( json ) );
			} else {
				dispatch( receive( json, id ) );
				dispatch( receiveMany( [].concat( json.parents, json.children ) ) );
				dispatch( createMembersForDomain( json.unit.users, json.unit.id ) );
			}
		})
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchDomain( state, id ) {
	const domains = state.domain;
	const domain  = (
		domains.items.get( id ) ||
		domains.items.find( d => id === d.get( 'code' ) )
	);

	if ( ! domain ) {
		return true;
	} else if ( domain.isFetching ) {
		return false;
	} else if ( domain.didInvalidate ) {
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

export function createDomain( domain ) {
	return ( dispatch, getState ) => {
		if ( shouldFetchDomain( getState(), domain.id ) ) {
			dispatch( create( domain ) );
		}
	};
}

function shouldFetchDomains( state ) {
	const domains = state.domain;

	if ( domains.isFetching ) {
		return false;
	} else {
		return true;
	}
}

export function fetchDomainsIfNeeded() {
	return ( dispatch, getState ) => {
		if ( shouldFetchDomains( getState() ) ) {
			return dispatch( fetchDomain() );
		} else {
			return Promise.resolve();
		}
	};
}
