import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { NavItem, NavLogout } from './';

class Nav extends React.Component {
	render() {
		let nav = this.props.items.map(
			( item, index ) => (
				<NavItem key={ index } href={ item.get( 'href' ) }>
					{ item.get( 'name' ) }
				</NavItem>
			)
		);

		return (
			<nav className='navbar navbar-light' id='nav'>
				<Link className='navbar-brand' to='/'>MES Hub</Link>
				<ul className='nav navbar-nav'>
					{ nav }
				</ul>
				<span className='pull-xs-right'>
					<NavLogout name={ this.props.name } />
				</span>
			</nav>
		);
	}
}

Nav.propTypes = {
	items:    PropTypes.object.isRequired,
	name:     PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default connect( state => ({
	items: state.nav,
	name:  state.profile.get( 'name' ) || ''
}), null, null, { pure: false } )( Nav );
