import React from 'react';
import { Link } from 'react-router';
import { MemberItem } from '../../member';
import { MaybeItem } from '../../shared';

export default class Domain extends React.Component {
	render() {
		let domain = this.props.domain;

		return (
			<main id='app'>
				{ this.name() }
				{ this.parentBreadcrumbs() }
				<p>Information:</p>
				<ul>
					<MaybeItem name='Website' extLink={ domain.website } />
					<MaybeItem name='Location' value={ domain.location } />
					<MaybeItem name='Details' value={ domain.defDoc } />
				</ul>
				<p>Officers:</p>
				<p>Children:</p>
				<p>Members:</p>
			</main>
		);
	}

	name() {
		if ( 'venue' !== this.props.domain.type ) {
			return (
				<h1>
					{ this.props.domain.name }
					<span className='text-muted'>{ this.props.domain.code }</span>
				</h1>
			);
		} else {
			return( <h1>{ this.props.domain.name }</h1> );
		}
	}

	parentBreadcrumbs() {
		if ( ! this.props.parents ) {
			return '';
		}

		let breadcrumbs = this.props.parents.toArray().map( parent => {
			return (
				<li key={ parent.id } className='breadcrumb-item'>
					<Link to={ '/domain/' + parent.code }>{ parent.name }</Link>
				</li>
			);
		});
		breadcrumbs.push(
			<li className='active breadcrumb-item' key={ this.props.domain.id }>
				{ this.props.domain.name }
			</li>
		);
		return (
			<ol className='breadcrumb'>
				{ breadcrumbs }
			</ol>
		);
	}

	officerItem( officer ) {
		let memberLink = member => {
			if ( ! member ) {
				return <em className='text-muted'>Vacant</em>;
			}

			let name = member.fullName || member.firstName + ' ' + member.lastName;

			return (
				<Link to={ '/member/' + member.membershipNumber }>
					{ name } ({ member.membershipNumber })
				</Link>
			);
		};

		return (
			<li key={ officer.id }>
				{ officer.name } &ndash;&nbsp;
				{ memberLink( officer.user ) }
			</li>
		);
	}
}
