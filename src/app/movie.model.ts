export interface Movie {
  id: number;
  title: string;
  release_date: Date;
  overview: string;
  genre_ids: number[];
  genres?: string[];
  vote_average: number;
  backdrop_path?: string;
}
