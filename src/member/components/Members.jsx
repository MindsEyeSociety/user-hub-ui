import React from 'react';
import data from '../data.js';
import { MemberItem } from './';

export default class Members extends React.Component {
	render() {
		let memberItems = data.map( member => {
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
