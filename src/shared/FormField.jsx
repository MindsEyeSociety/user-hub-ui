import React, { PropTypes } from 'react';

export class FormField extends React.Component {
	render() {
		let slug = this.props.attrs.name.toLowerCase().replace( ' ', '' );
		let attrs = Object.assign({
			type: 'text',
			className: '',
			id: 'input-' + slug,
			placeholder: this.props.attrs.name,
			required: true
		}, this.props.attrs );

		return (
			<div className='form-group row'>
				<label htmlFor={ attrs.id } className='col-sm-2 form-control-label'>
					{ attrs.name }
				</label>
				<div className='col-sm-10'>
					<input
						type={ attrs.type }
						className={ 'form-control ' + attrs.className }
						id={ attrs.id }
						placeholder={ attrs.placeholder }
						defaultValue={ attrs.value }
						required={ attrs.required ? 'required' : '' }
					/>
				</div>
			</div>
		);
	}
}
