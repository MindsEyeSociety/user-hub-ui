import { dispatch } from 'redux';

export const SET = 'profile/SET';
function set( id, name ) {
	return {
		type: SET,
		payload: { id, name }
	};
}

export function setProfileId( id, name ) {
	return dispatch => dispatch( set( id, name ) );
}
