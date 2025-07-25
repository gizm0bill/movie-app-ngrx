export interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  genre: string;
  director: string;
  rating: number;
  description?: string; // Optional field for movie description
}
