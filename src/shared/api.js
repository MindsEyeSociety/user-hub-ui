import cookie from 'js-cookie';

function callApi( endpoint, method = 'GET', body = null ) {
	return fetch(
		window.config.hubUrl + endpoint + '?token=' + cookie.get( 'token' ),
		{ method, body }
	)
	.then( response => {
		if ( 403 === response.status ) {
			return response.json()
			.then( json => {
				if ( 'Invalid token' === json.message ) {
					cookie.remove( 'token' );
					document.location.reload();
				}
				throw new Error( 'Invalid status found: ' + response.status );
			});
		}
		if ( 200 !== response.status ) {
			throw new Error( 'Invalid status found: ' + response.status );
		}
		return response.json();
	});
}

export const api = {
	get:  path => callApi( path ),
	post: ( path, body ) => callApi( path, 'POST', body ),
	put:  ( path, body ) => callApi( path, 'PUT', body ),
	del:  path => callApi( path, 'DELETE' )
};
