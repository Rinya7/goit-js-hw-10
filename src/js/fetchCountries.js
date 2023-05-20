const URL_BASE_API = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(
    `${URL_BASE_API}${name.target.value.trim()}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export { fetchCountries };
