import React from 'react';
import { Link } from 'react-router';

export default class NavItem extends React.Component {
	render() {
		let isHome = this.props.item.href === '/'
		return (
			<li className='nav-item'>
				<Link
					to={ this.props.item.href }
					className='nav-link'
					activeClassName='active'
					onlyActiveOnIndex={ isHome }
				>
					{ this.props.item.name }
				</Link>
			</li>
		);
	}
}
