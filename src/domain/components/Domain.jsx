import React from 'react';
import { Link } from 'react-router';

export default class Domain extends React.Component {
	render() {
		let domain = this.props.domain.unit;

		let name = domain.name;
		if ( 'venue' === domain.type ) {
			name = <span className='text-muted'>{ domain.code }:</span> + ' ' + name;
		}

		return (
			<main id='app'>
				<h1>{ name }</h1>
				{ this.parentBreadcrumbs() }
			</main>
		);
	}

	parentBreadcrumbs() {
		if ( ! this.props.domain.parents ) {
			return '';
		}

		let breadcrumbs = this.props.domain.parents.map( parent => {
			return (
				<li key={ parent.id } className='breadcrumb-item'>
					<Link to={ '/domain/' + parent.id }>{ parent.name }</Link>
				</li>
			);
		});
		breadcrumbs.push(
			<li className='active breadcrumb-item' key={ this.props.domain.unit.id }>
				{ this.props.domain.unit.name }
			</li>
		);
		return (
			<ol className='breadcrumb'>
				{ breadcrumbs }
			</ol>
		);
	}
}
