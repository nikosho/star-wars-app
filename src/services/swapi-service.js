export default class SwapiService {
    _apiBaseUrl = "https://swapi.dev/api";
    async getResource(url) {
        const res = await fetch(`${this._apiBaseUrl}${url}`);
        if(!res.ok) {
            throw new Error(`Возникла ошибка при запросе на сервер`)
        }
        return res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`)
        return res.results;
    }

    async getPerson(id) {
        return await this.getResource(`/people/${id}/`);
    }

    async getAllPlanets() {
        const res = await this.getResource('/planets/')
        return res.results;
    }

    async getPlanet(id) {
        return await this.getResource(`/planets/${id}/`);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results;
    }

    async getStarship(id) {
        return await this.getResource(`/starships/${id}/`)
    }
}
