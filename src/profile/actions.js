import { dispatch } from 'redux';
import member from '../member';
import office from '../office';

export const SET = 'profile/SET';
function set( id, name ) {
	return {
		type: SET,
		payload: { id, name }
	};
}

export const OFFICES = 'profile/OFFICES';
function offices( ids ) {
	return {
		type: OFFICES,
		payload: ids
	};
}

export function setProfileId( id, name ) {
	return dispatch => dispatch( set( id, name ) );
}

export function setProfileOffices( ids ) {
	return dispatch => dispatch( offices( ids ) );
}

export function getCurrentUser() {
	return dispatch => {
		dispatch( member.actions.fetchMemberIfNeeded( 'me' ) );
		dispatch( office.actions.fetchCurrentOffices() );
	};
}
