import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { FormField } from '../../shared';

export default class MemberEdit extends React.Component {
	render() {
		let member = this.props.member;

		let rows = [
			{ name: 'First Name', value: member.firstName },
			{ name: 'Last Name', value: member.lastName },
			{ name: 'Nickname', value: member.nickname, required: false },
			{ name: 'Email', value: member.email, type: 'email' },
			{ name: 'Address', value: member.address, required: false }
		];

		return (
			<main id='app'>
				<h1>{ member.fullName }</h1>
				<h2 className='text-muted'>{ member.membershipNumber }</h2>
				<form className='m-t-1'>
					{ rows.map(
						row => <FormField key={ row.name } attrs={ row } />
					) }
					<button type='submit' className='btn btn-primary'>Save Changes</button>
					&nbsp;
					<Link to={ '/member/' + member.id } className='btn btn-secondary' role='button'>Cancel</Link>
				</form>
			</main>
		);
	}
}
