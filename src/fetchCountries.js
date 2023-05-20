const URL_BASE_API = 'https://restcountries.com/v3.1/name/';

export default function fetch(name) {
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

function meinCheck(data) {
  if (data.length > 10 || data.length < 1) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    //cleanBlok(refs.countryInfo);
    //cleanBlok(refs.countryOutList);
    cleanBlokCountryList();
    cleanBlokCountryInfo();
  }
  if (data.length <= 10 && data.length >= 2) {
    Notify.failure('Рисуем спосок стран');
    createCountryList(data);
    //cleanBlok(refs.countryInfo);
    cleanBlokCountryInfo();
  }
  if (data.length === 1) {
    Notify.failure('Рисуем одну страну');
    //cleanBlok(refs.countryOutList);
    cleanBlokCountryList();
    createCountryInfo(data);
  }
}
