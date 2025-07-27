import { Environment } from "./environment/model";

export default class implements Environment {
  production = true
  apiUrl = 'https://api.themoviedb.org/3/';
  apiKey = '__API_KEY__';
}
