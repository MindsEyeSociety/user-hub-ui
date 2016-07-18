import { createSelector } from 'reselect';
import { List } from 'immutable';

const getCurrentId = ( state, props ) => props.params.id;

const getDomains = state => state.domain.items;

export const getDomainById = createSelector(
	getDomains,
	getCurrentId,
	( domains, id ) => {
		return domains.get( id ) || domains.find( d => id === d.get( 'code' ) ) || {};
	}
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
