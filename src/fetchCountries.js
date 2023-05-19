const URL_BASE_API = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(name) {
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
      .then(meinCheck())
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        //cleanBlok(refs.countryInfo);
        //cleanBlok(refs.countryOutList);
        cleanBlokCountryList();
        cleanBlokCountryInfo();
      });
  }
}
