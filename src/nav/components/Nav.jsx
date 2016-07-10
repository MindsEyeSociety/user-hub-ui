import React from 'react';
import { withRouter, Link } from 'react-router';
import { NavItem, NavLogout } from './';

const Nav = React.createClass({
	render: function() {
		let createItem = ( item, index ) => <NavItem key={index} item={item} />;
		return (
			<nav className='navbar navbar-light' id='nav'>
				<Link className='navbar-brand' to='/'>MES Hub</Link>
				<ul className='nav navbar-nav'>
					{ this.props.items.map( createItem ) }
				</ul>
				<span className='pull-xs-right'>
					<NavLogout name='Ephraim' />
				</span>
			</nav>
		);
	}
});

export default Nav;
