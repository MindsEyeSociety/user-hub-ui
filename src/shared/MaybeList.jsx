import React, { PropTypes } from 'react';

export class MaybeList extends React.Component {
	render() {
		if ( ! this.props.show ) {
			return null;
		}

		return (
			<div className={ this.props.className }>
				<p>{ this.props.name }:</p>
				<ul>{ this.props.children }</ul>
			</div>
		);
	}
}

MaybeList.propTypes = {
	name:      PropTypes.string.isRequired,
	className: PropTypes.string,
	show:      PropTypes.number.isRequired
};
