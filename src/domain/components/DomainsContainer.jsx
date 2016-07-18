import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Domains } from './';
import { fetchDomainsIfNeeded } from '../actions';
import { getDomainList } from '../selectors';
import { Loading } from '../../shared';

class DomainsContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchDomainsIfNeeded() );
	}

	render() {
		if ( ! this.props.domains ) {
			return( <Loading /> );
		} else {
			return( <Domains domains={ this.props.domains } /> );
		}
	}
}

DomainsContainer.propTypes = {
	domains:  PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect( state => ({ domains: getDomainList( state ) }) )( DomainsContainer );
