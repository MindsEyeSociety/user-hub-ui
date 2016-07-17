import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Members } from './';
import { fetchMembersIfNeeded } from '../actions';
import { getMemberList } from '../selectors';
import { Loading } from '../../shared';

class MembersContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchMembersIfNeeded() );
	}

	render() {
		if ( ! this.props.members ) {
			return( <Loading /> );
		} else {
			return( <Members members={ this.props.members } /> );
		}
	}
}

MembersContainer.propTypes = {
	members:  PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect( state => ({ members: getMemberList( state ) }) )( MembersContainer );
