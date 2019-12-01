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

function postJson(url, jsonBody = null) {
	var headers = {
		"Content-Type": "application/json"
	}
	var fetchOptions = {
		method: 'POST',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}
	if (jsonBody) fetchOptions['body'] = JSON.stringify(jsonBody);
	return fetchWrapper(url, fetchOptions, 'post');
}

function getJson(url) {
	var headers = new Headers();
	var fetchOptions = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}
	return fetchWrapper(url, fetchOptions, 'get');
}

export { getJson, postJson };