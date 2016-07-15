import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export class MaybeItem extends React.Component {
	render() {
		let val = this.props.value || this.props.intLink || this.props.extLink;

		if ( ! val ) {
			return null;
		}

		if ( this.props.intLink ) {
			val = <Link to={ this.props.intLink }>{ val }</Link>;
		} else if ( this.props.extLink ) {
			val = <a href={ this.props.extLink } target='_blank'>{ val }</a>;
		}

		return (
			<li className={ this.props.className }>
				{ this.props.name }: { val }
			</li>
		);
	}
}

MaybeItem.propTypes = {
	name: PropTypes.string.isRequired,
	intLink: PropTypes.string,
	extLink: PropTypes.string
};
