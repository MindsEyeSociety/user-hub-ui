import { dispatch } from 'redux';
import { Map } from 'immutable';

import { Offices, Office } from './models';
import { api } from '../shared';
import { createDomain } from '../domain';
import { setProfileOffices } from '../profile';

export const REQUEST = 'office/REQUEST';
function request( id ) {
	return {
		type: REQUEST,
		payload: id
	};
}

export const RECEIVE = 'office/RECEIVE';
function receive( data ) {
	data = Object.assign( {}, data );
	let now = Date.now();
	data.lastUpdated = now;
	return {
		type: RECEIVE,
		id: data.id,
		payload: new Office( data ),
		receivedAt: now
	};
}

export const REQUEST_MANY = 'office/REQUEST_MANY';
function requestMany() {
	return {
		type: REQUEST_MANY
	};
}

export const RECEIVE_MANY = 'office/RECEIVE_MANY';
function receiveMany( data ) {
	let now = Date.now();
	let offices = data
	.map( d => {
		d.lastUpdated = now;
		return d;
	})
	.map( d => [ d.id, new Office( d ) ] );

	return {
		type: RECEIVE_MANY,
		payload: new Offices({
			lastUpdated: now,
			items: new Map( offices )
		}),
		receivedAt: now
	};
}

export const ERROR = 'office/ERROR';
function error( err ) {
	return {
		type: ERROR,
		payload: err,
		stack: err.stack
	};
}

function fetchOffice( id ) {
	return dispatch => {
		dispatch( request( id ) );
		return api.get( '/office/' + id )
		.then( json => {
			dispatch( receive( json ) );
			if ( json.orgUnit ) {
				dispatch( createDomain( json.orgUnit ) );
			}
		})
		.catch( err => dispatch( error( err ) ) );
	};
}

function shouldFetchOffice( state, id ) {
	const offices = state.office;
	const office  = offices.items.get( id );

	if ( id && ( ! office || office.didInvalidate ) ) {
		return true;
	} else {
		return false;
	}
}

export function fetchOfficeIfNeeded( id ) {
	return ( dispatch, getState ) => {
		if ( shouldFetchOffice( getState(), id ) ) {
			return dispatch( fetchOffice( id ) );
		} else {
			return Promise.resolve();
		}
	};
}

export function fetchCurrentOffices() {
	return dispatch => {
		dispatch( requestMany() );
		return api.get( '/office/me' )
		.then( json => {
			dispatch( receiveMany( json ) );
			dispatch( setProfileOffices( json.map( o => o.id ) ) );
		})
		.catch( err => dispatch( error( err ) ) );
	};
}
