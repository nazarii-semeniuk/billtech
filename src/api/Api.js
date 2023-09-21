export default class Api {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async get(path) {
        const response = await fetch(`${this.endpoint}${path}`);
        return await response.json();
    }
}