import React from 'react';
import { Link } from 'react-router';
import Linkify from 'react-linkify';
import { DomainItem } from './';
import { MemberItem } from '../../member';
import { MaybeItem, MaybeList } from '../../shared';

export default class Domain extends React.Component {
	render() {
		let domain = this.props.domain;

		let details = <MaybeItem name='Details' value={ domain.defDoc } />;
		if ( domain.defDoc && domain.defDoc.length > 100 ) {
			let defDoc = domain.defDoc.split( /(\\n)/g ).map( ( line, index ) => {
				if ( line.match( /(\\n)/g ) ) {
					return React.createElement( 'br', { key: index } );
				} else {
					return line;
				}
			});
			details = (
				<li>Details:<br /><Linkify>{ defDoc }</Linkify></li>
			);
		}

		return (
			<main id='app'>
				{ this.name() }
				{ this.parentBreadcrumbs() }
				<p>Information:</p>
				<ul>
					<MaybeItem name='Website' extLink={ domain.website } />
					<MaybeItem name='Location' value={ domain.location } />
					<MaybeItem name='Venue Type' value={ domain.venueType } />
					{ details }
				</ul>
				<MaybeList name='Officers' show={ 0 } />
				<MaybeList name='Children' show={ this.props.childs.size }>
					{ this.props.childs.map( d => <DomainItem domain={ d } key={ d.id } /> ) }
				</MaybeList>
				<MaybeList name='Members' show={ this.props.members.size }>
					{ this.props.members.map( m => <MemberItem member={ m } key={ m.id } /> ) }
				</MaybeList>
			</main>
		);
	}

	name() {
		if ( 'Venue' !== this.props.domain.type ) {
			return (
				<h1>
					<span className='text-muted'>{ this.props.domain.code }:</span>&nbsp;
					{ this.props.domain.name }
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
