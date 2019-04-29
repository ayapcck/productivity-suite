import { HTTPError } from './error.js';

function loadJson(url, options) {
	return fetch(url, options).then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			throw new HTTPError(response);
		}
	});
}

export { loadJson };