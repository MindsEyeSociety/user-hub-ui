import { createSelector } from 'reselect';

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

export const getMembersByDomain = createSelector(
	( state, props ) => state.member.items.filter( m => props.params.id === m.get( 'orgUnit' ) ),
	( members = [] ) => members
);
