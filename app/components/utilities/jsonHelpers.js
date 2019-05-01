import { HTTPError } from './error.js';

function fetchWrapper(url, options, type) {
	return fetch(url, options).then(response => {
		if (response.status == 200) {
			if (type == 'post') {
				return response;
			} else if (type =='get') {
				return response.json();
			}
		} else {
			throw new HTTPError(response);
		}
	});
}

function postJson(url, options) {
	return fetchWrapper(url, options, 'post');
}

function getJson(url, options) {
	return fetchWrapper(url, options, 'get');
}

export { getJson, postJson };