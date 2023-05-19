export { getFullName };

function fetchCountries(name) {
  if (name.target.value.trim()) {
    return fetch(
      `${URL_BASE_API}${name.target.value.trim()}?fields=name,capital,population,flags,languages`
    )
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        console.log(data);

        if (data.length > 10 || data.length < 1) {
          refs.countryOutList.innerHTML = '';
          refs.countryInfo.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length <= 10 && data.length >= 2) {
          Notify.failure('Рисуем спосок стран');
          refs.countryOutList.innerHTML = createCountryList(data);
          refs.countryInfo.innerHTML = '';
        }
        if (data.length === 1) {
          refs.countryOutList.innerHTML = '';
          Notify.failure('Рисуем одну страну');
          refs.countryInfo.innerHTML = createCountryInfo(data);
        }
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        refs.countryInfo.innerHTML = '';
        refs.countryOutList.innerHTML = '';
      });
  }
}

function createCountryList(arr) {
  return arr
    .map(
      ({ name: { common }, flags: { svg, alt } }) =>
        (refs.countryInfo.innerHTML = `
          <h2><img src="${svg}" alt="${alt}" width= "25" height = "25">
          ${common}
          </h2>
  `)
    )
    .join('');
}

function createCountryInfo(arr) {
  return arr
    .map(
      ({
        capital,
        population,
        name: { common },
        flags: { svg, alt },
        languages,
      }) =>
        (refs.countryInfo.innerHTML = `
  <ul>
  <li>
    <h1><img src="${svg}" alt="${alt}" width= "250" height = "250">
    ${common}
    </h1>
    </li>
    <li>
    <h2>CAPITAL: ${capital}</h2>
    </li>
    <li>
    <h2>POPULATION: ${population}</h2>
    </li>
    <li>
    <h2>LANGUAGES: ${Object.values(languages)}</h2>
    </li>
  </ul>`)
    )
    .join('');
}
