import React from 'react';
import { Link } from 'react-router';

export default class DomainItem extends React.Component {
	render() {
		let domain = this.props.domain;
		let name = domain.name;
		if ( domain.code ) {
			name += ' (' + domain.code + ')';
		}
		return (
			<li>
				<Link to={ '/domain/' + ( domain.code || domain.id ) }>
					{ name }
				</Link>
			</li>
		);
	}
}
