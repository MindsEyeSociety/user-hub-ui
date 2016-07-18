import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Domain } from './';
import { fetchDomainIfNeeded } from '../actions';
import { getDomainById, getParentsForDomain, getChildrenForDomain } from '../selectors';
import { Loading } from '../../shared';

class DomainContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchDomainIfNeeded( this.id ) );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.location.key !== nextProps.location.key ) {
			const { dispatch, params } = nextProps;
			dispatch( fetchDomainIfNeeded( params.id ) );
		}
	}

	render() {
		if ( ! Object.keys( this.props.domain ).length ) {
			return( <Loading /> );
		} else if ( this.props.route.editMode ) {
			// return( <DomainEdit domain={ this.props.domain } /> );
		} else {
			return( <Domain
				domain={ this.props.domain }
				parents={ this.props.parents }
				childs={ this.props.childs }
			/> );
		}
	}

	get id() {
		return this.props.params.id;
	}
}

DomainContainer.propTypes = {
	domain:   PropTypes.object.isRequired,
	parents:  PropTypes.object.isRequired,
	childs:   PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ( state, props ) => ({
	domain:  getDomainById( state, props ),
	parents: getParentsForDomain( state, props ),
	childs:  getChildrenForDomain( state, props )
});

export default connect( mapStateToProps )( DomainContainer );
