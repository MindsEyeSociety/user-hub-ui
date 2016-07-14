import React from 'react';
import { Link } from 'react-router';

export default class MemberItem extends React.Component {
	render() {
		let member = this.props.member;
		return (
			<li>
				<Link to={ '/member/' + member.membershipNumber }>
					{ member.fullName } ({ member.membershipNumber })
				</Link>
			</li>
		);
	}
}
