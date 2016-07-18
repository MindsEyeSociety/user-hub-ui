import React from 'react';
import { DomainItem } from './';

export default class Domains extends React.Component {
	render() {
		let domains = this.props.domains.map( domain => {
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
