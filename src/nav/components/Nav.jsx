import React from 'react';
import {NavItem, NavLogout} from '../'

export class Nav extends React.Component {
	render() {
		let createItem = ( item, index ) => <NavItem key={index} item={item} />;
		return (
			<nav className='navbar navbar-light' id='nav'>
				<a className='navbar-brand' href='/'>MES Hub</a>
				<ul className='nav navbar-nav'>
					{ this.props.items.map( createItem ) }
				</ul>
				<span className='pull-xs-right'>
					<NavLogout name='Ephraim' />
				</span>
			</nav>
		);
	}
}
