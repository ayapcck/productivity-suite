class HTTPError extends Error {
	constructor(response) {
		super(`${response.status}`);
		this.name = 'HTTPError';
		this.response = response;
	}
}

export { HTTPError };