import { createSelector } from 'reselect';
import { List } from 'immutable';
import { Domain } from './models';

export const getCurrentId = ( state, props ) => {
	let id = props.params.id;
	return Number.parseInt( id, 10 ) || id;
};

const getDomains = state => state.domain.items;

export const getDomainById = createSelector(
	getDomains,
	getCurrentId,
	( domains, id ) => (
		domains.get( id ) ||
		domains.find( d => id === d.get( 'code' ) ) ||
		new Domain({ id: 0 })
	)
);

export const getDomainList = createSelector(
	getDomains,
	( domains ) => domains.toList()
);

export const getParentsForDomain = createSelector(
	getDomains,
	getDomainById,
	( domains, child ) => {
		if ( ! Object.keys( child ).length ) {
			return new List();
		}
		return child.get( 'parents' )
		.map( d => domains.get( d ) )
		.filter( d => d );
	}
);

export const getChildrenForDomain = createSelector(
	getDomains,
	getDomainById,
	( domains, child ) => {
		if ( ! Object.keys( child ).length ) {
			return new List();
		}
		return child.get( 'children' )
		.map( d => domains.get( d ) )
		.filter( d => d );
	}
);

export const getMembersForDomain = createSelector(
	getDomainById,
	state => state.member.items,
	( domain, members ) => members.filter( m => domain.get( 'id' ) === m.get( 'orgUnit' ) )
);
