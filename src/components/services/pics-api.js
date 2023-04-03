const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33341846-2d80dabb5272f7d922b758ae2';

export const getPics = (searchQuery, nextPage) => {
  const searchParams = new URLSearchParams({
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${nextPage}&${searchParams}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Oops, something went wrong...`));
  });
};
