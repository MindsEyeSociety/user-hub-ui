import { createSelector } from 'reselect';

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
	getDomainList,
	getDomainById,
	( domains, child ) => {
		return domains.filter( d => -1 !== child.parents.indexOf( domains.id ) );
	}
);
