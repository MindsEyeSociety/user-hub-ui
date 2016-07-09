import React from 'react';

export class MemberItem extends React.Component {
	render() {
		let member = this.props.member;
		return (
			<li>
				<a href={ '/member/' + member.id }>
					{ member.fullName } ({ member.membershipNumber })
				</a>
			</li>
		);
	}
}
