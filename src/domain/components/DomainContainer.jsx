import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Domain } from './';
import { fetchDomainIfNeeded } from '../actions';
import { getDomainById, getParentsForDomain } from '../selectors';
import { Loading } from '../../shared';

class DomainContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchDomainIfNeeded( this.id ) );
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
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ( state, props ) => ({
	domain:  getDomainById( state, props ),
	parents: getParentsForDomain( state, props )
});

export default connect( mapStateToProps )( DomainContainer );
