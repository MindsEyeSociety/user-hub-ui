import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { MaybeItem } from '../../shared';

export default class Member extends React.Component {
	render() {
		let member = this.props.member;

		let editLink = '';
		if ( true ) {
			editLink = <Link to={ '/member/' + member.membershipNumber + '/edit' } className='text-muted'>(edit)</Link>;
		}

		let expire = moment( member.membershipExpiration );

		let expires = expire.calendar();
		if ( expire.isBefore() ) {
			expires = <strong className='text-danger'>{ expires }</strong>;
		}

		let orgLink = <em>None</em>;
		if ( this.props.domain ) {
			orgLink = (
				<Link to={ '/domain/' + this.props.domain.code }>
					{ this.props.domain.name + ' (' + this.props.domain.code + ')' }
				</Link>
			);
		}

		return (
			<main id='app'>
				<h1>{ member.fullName }</h1>
				<h2 className='text-muted'>{ member.membershipNumber }</h2>
				<p>
					Information: { editLink }
				</p>
				<ul>
					<MaybeItem name='Email' extLink={ 'mailto:' + member.email } value={ member.email } />
					<li>
						Expires: { expires }
					</li>
					<li>
						Domain: { orgLink }
					</li>
				</ul>
			</main>
		);
	}
}
