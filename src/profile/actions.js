import { dispatch } from 'redux';

export const SET = 'profile/SET';
function set( id ) {
	return {
		type: SET,
		payload: id
	};
}

export function setProfileId( id ) {
	return dispatch => dispatch( set( id ) );
}
