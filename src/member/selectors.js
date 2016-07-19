import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getMembers = state => state.member.items;

export const getCurrentId = ( state, props ) => {
	let id = props.route.id || props.params.id;
	return Number.parseInt( id, 10 ) || id;
}

export const getMemberById = createSelector(
	getCurrentId,
	getMembers,
	( id, members ) => (
		members.get( id ) ||
		members.find( m => id === m.get( 'membershipNumber' ) ) ||
		{}
	)
);

export const getMemberList = createSelector(
	getMembers,
	( members = [] ) => members.toList()
);

export const getMemberDomain = createSelector(
	getMemberById,
	state => state.domain.items,
	( member = {}, domains ) => {
		if ( ! Object.keys( member ).length ) {
			return new Map();
		}
		return domains.get( member.get( 'orgUnit' ) );
	}
);
