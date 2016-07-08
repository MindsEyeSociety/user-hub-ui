import React from 'react';

export class NavLogout extends React.Component {
	render() {
		return (
			<a href='#' id='logout' className='btn btn-secondary'>
				Logout {this.props.name}
			</a>
		);
	}
}
