import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfileIfNeeded } from '../actions';
import Profile from './Profile.jsx';

class ProfileContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchProfileIfNeeded() );
	}

	render() {
		return(
			<Profile profile={ this.props.profile } />
		);
	}
}

ProfileContainer.propTypes = {
	profile: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
	const { profile } = state;
	return { profile };
}

export default connect( mapStateToProps )( ProfileContainer );
