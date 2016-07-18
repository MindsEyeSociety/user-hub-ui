import { createSelector } from 'reselect';
import { Map } from 'immutable';

const memberById = ( state, props ) => {
	let id      = props.params.id;
	let members = state.member.items;

	return members.get( id ) || members.find( m => id === m.get( 'membershipNumber' ) );
};

export const getMemberById = createSelector(
	memberById,
	( member = {} ) => member
);

export const getMemberList = createSelector(
	state => state.member.items.toList(),
	( members = [] ) => members
);

export const getMemberDomain = createSelector(
	getMemberById,
	state => state.domain.items,
	( member, domains ) => {
		if ( ! Object.keys( member ).length ) {
			return new Map();
		}
		return domains.get( member.get( 'orgUnit' ) );
	}
);
