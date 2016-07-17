import React from 'react';
import { MemberItem } from './';
import { Loading } from '../../shared';

export default class Members extends React.Component {
	render() {
		let memberItems = this.props.members.map( member => {
			return <MemberItem key={ member.id } member={ member } />;
		});
		return (
			<main id='app'>
				<h1>Members</h1>
				<ul>
					{ memberItems }
				</ul>
			</main>
		);
	}
}
