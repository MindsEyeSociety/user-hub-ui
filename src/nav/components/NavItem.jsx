import React from 'react';
import { Link } from 'react-router';

export default class NavItem extends React.Component {
	render() {
		let isHome = this.props.href === '/';
		return (
			<li className='nav-item'>
				<Link
					to={ this.props.href }
					className='nav-link'
					activeClassName='active'
					onlyActiveOnIndex={ isHome }
				>
					{ this.props.children }
				</Link>
			</li>
		);
	}
}

NavItem.propTypes = {
	href: React.PropTypes.string.isRequired
};
