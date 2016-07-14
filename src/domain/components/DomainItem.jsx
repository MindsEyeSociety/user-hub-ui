import React from 'react';
import { Link } from 'react-router';

export default class DomainItem extends React.Component {
	render() {
		let domain = this.props.domain;
		return (
			<li>
				<Link to={ '/domain/' + domain.id }>
					{ domain.name } ({ domain.code })
				</Link>
			</li>
		);
	}
}
