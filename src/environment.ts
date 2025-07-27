import { Environment } from "./environment/model";

export default class implements Environment {
  production = true
  apiUrl = 'https://api.themoviedb.org/3/';
  apiKey = '__API_KEY__'; // intentionally left as a placeholder for the GitHub Action to replace with the actual API key
}
