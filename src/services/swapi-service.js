export default class SwapiService {

    _apiBaseUrl = "https://swapi.dev/api";

    getResource = async (url) => {
        const res = await fetch(`${this._apiBaseUrl}${url}`);
        if(!res.ok) {
            throw new Error(`Ошибка при запросе на сервер по адресу: ${this._apiBaseUrl}${url}. Код ошибки: ${res.status}`)
        }
        return res.json();
    }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`)
        return res.results.map(person => this._transformPerson(person));
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    getAllPlanets = async () => {
        const res = await this.getResource('/planets/')
        return res.results.map(planet => this._transformPlanet(planet));
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet)
    }

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results.map(starship => this._transformStarship(starship));
    }

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet["rotation_period"],
            diameter: planet.diameter
        }
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person["birth_year"],
            eyeColor: person["eye_color"],
            height: person.height,
            mass: person.mass
        }
    }

    getStarshipImage = (id) => {
        return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
    }
    getPersonImage = (id) => {
        return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
    }
    getPlanetImage = (id) => {
        return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
    }
}


