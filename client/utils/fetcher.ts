type Method = 'POST' | 'PATCH';

const fetcher = async (path: string, method: Method, body: object, headers: HeadersInit) => {
	try {
		const response = await fetch(path, { method, body: JSON.stringify(body), headers });
		return response.json();
	} catch (e) {
		// console.dir({ e });
	}
};

export default fetcher;