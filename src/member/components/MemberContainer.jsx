import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Member, MemberEdit } from './';
import data from '../data.js';

class MemberContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		// dispatch( fetchProfileIfNeeded() );
	}

	render() {
		if ( this.props.route.editMode ) {
			return( <MemberEdit member={ data[0] } /> );
		} else {
			return( <Member member={ data[0] } /> );
		}
	}
}

MemberContainer.propTypes = {
// 	member: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
	const { member } = state;
	return { member };
}

export default connect( mapStateToProps )( MemberContainer );
