import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Member, MemberEdit } from './';
import { fetchMemberIfNeeded } from '../actions';
import { getMemberById } from '../selectors';
import { Loading } from '../../shared';

class MemberContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchMemberIfNeeded( this.id ) );
	}

	render() {
		if ( ! this.props.member ) {
			return( <Loading /> );
		} else if ( this.props.route.editMode ) {
			return( <MemberEdit member={ this.props.member } /> );
		} else {
			return( <Member member={ this.props.member } /> );
		}
	}

	get id() {
		return this.props.params.id;
	}
}

MemberContainer.propTypes = {
	member:   PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect( ( state, props ) => ({
	member: getMemberById( state, props )
}) )( MemberContainer );
