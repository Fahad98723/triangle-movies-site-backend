export const MoviesSearchableFields = ['title', 'release_date'];
export const MoviesFilterableFields = ['searchName', 'genres', 'categories'];

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
