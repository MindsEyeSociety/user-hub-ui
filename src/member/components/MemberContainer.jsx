import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Member, MemberEdit } from './';
import { fetchMemberIfNeeded } from '../actions';
import { getCurrentId, getMemberById, getMemberDomain } from '../selectors';
import { Loading } from '../../shared';

class MemberContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchMemberIfNeeded( this.props.memberId ) );
	}

	render() {
		if ( ! Object.keys( this.props.member ).length ) {
			return( <Loading /> );
		} else if ( this.props.route.editMode ) {
			return( <MemberEdit member={ this.props.member } /> );
		} else {
			return( <Member member={ this.props.member } domain={ this.props.domain } /> );
		}
	}
}

MemberContainer.propTypes = {
	memberId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
	member:   PropTypes.object.isRequired,
	domain:   PropTypes.object,
	dispatch: PropTypes.func.isRequired
}

export default connect( ( state, props ) => {
	return {
		memberId: getCurrentId( state, props ),
		member:   getMemberById( state, props ),
		domain:   getMemberDomain( state, props )
	};
})( MemberContainer );
