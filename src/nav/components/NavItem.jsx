import React from 'react';

export class NavItem extends React.Component {
	render() {
		let isActive = -1 !== document.location.pathname.indexOf( this.props.item.href );
		if ( '/' === this.props.item.href ) {
			isActive = '/' === document.location.pathname;
		}
		let activeClass = isActive ? 'active' : '';
		return (
			<li className={'nav-item ' + activeClass}>
				<a href={this.props.item.href} className="nav-link">{this.props.item.name}</a>
			</li>
		);
	}
}
