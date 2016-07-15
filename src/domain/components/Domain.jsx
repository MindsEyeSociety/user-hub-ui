import React from 'react';
import { Link } from 'react-router';
import { MemberItem } from '../../member';
import { MaybeItem } from '../../shared';

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
				<p>Information:</p>
				<ul>
					<MaybeItem name='Website' extLink={ domain.website } />
					<MaybeItem name='Location' value={ domain.location } />
					<MaybeItem name='Details' value={ domain.defDoc } />
				</ul>
				<p>Officers:</p>
				<ul>{ domain.offices.map( this.officerItem, this ) }</ul>
				<p>Members:</p>
				<ul>
					{ domain.users.map( user => <MemberItem key={ user.id } member={ user } /> ) }
				</ul>
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
					<Link to={ '/domain/' + parent.code }>{ parent.name }</Link>
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
