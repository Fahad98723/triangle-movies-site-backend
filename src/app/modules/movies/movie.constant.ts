export const MoviesSearchableFields = ['title', 'release_date'];
export const MoviesFilterableFields = ['searchName', 'genres', 'categories'];

export function capitalizeWords(input: string): string {
  console.log(input);

  return input
    .split(' ')
    .map(phrase => {
      return phrase.split(' ').map(word => {
        if (word.toLowerCase() === 'and') {
          return '&'; // Replace "and" with "&"
        }
        if (word.toLowerCase() == 'dc,') {
          return 'DC,'; // Replace "and" with "&"
        }
        if (word.toLowerCase() == 'tv') {
          return 'TV'; // Replace "and" with "&"
        }
        if (word.toLowerCase() == 'or') {
          return 'or'; // Replace "and" with "&"
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      });
    })
    .join(' ');
}
