import React from 'react';
import { list as data } from '../data.js';
import { DomainItem } from './';

export default class Domains extends React.Component {
	render() {
		let domains = data.map( domain => {
			return <DomainItem key={ domain.id } domain={ domain } />;
		});
		return (
			<main id='app'>
				<h1>Domains</h1>
				<ul>
					{ domains }
				</ul>
			</main>
		);
	}
}
