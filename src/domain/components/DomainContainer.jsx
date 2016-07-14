import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Domain, DomainEdit } from './';
import { domain as data } from '../data.js';

class DomainContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		// dispatch( fetchProfileIfNeeded() );
	}

	render() {
		if ( this.props.route.editMode ) {
			return( <DomainEdit domain={ data } /> );
		} else {
			return( <Domain domain={ data } /> );
		}
	}
}

DomainContainer.propTypes = {
// 	Domain: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
	const { domain } = state;
	return { domain };
}

export default connect( mapStateToProps )( DomainContainer );
