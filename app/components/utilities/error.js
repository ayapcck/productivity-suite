class HTTPError extends Error {
	constructor(response) {
		super(`${response.status} for ${response.url}`);
		this.name = 'HTTPError';
		this.response = response;
	}
}

export { HTTPError };