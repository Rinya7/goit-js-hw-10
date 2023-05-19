import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const URL_BASE_API = 'https://restcountries.com/v3.1/name/';

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryOutList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

//console.log(refs.countryOut);
refs.inputCountry.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);

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
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          cleanBlok(refs.countryInfo);
          cleanBlok(refs.countryOutList);
        }
        if (data.length <= 10 && data.length >= 2) {
          Notify.failure('Рисуем спосок стран');
          createCountryList(data);
          cleanBlok(refs.countryInfo);
        }
        if (data.length === 1) {
          Notify.failure('Рисуем одну страну');
          cleanBlok(refs.countryOutList);
          createCountryInfo(data);
        }
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        cleanBlok(refs.countryInfo);
        cleanBlok(refs.countryOutList);
      });
  }
}
function meinCheck(data) {}

function createCountryList(arr) {
  return (refs.countryOutList.innerHTML = arr
    .map(
      ({ name: { common }, flags: { svg, alt } }) =>
        (refs.countryOutList.innerHTML = `
        <h2><img src="${svg}" alt="${alt}" width= "25" height = "25">
        ${common}
        </h2>
`)
    )
    .join(''));
}

function createCountryInfo(arr) {
  return (refs.countryInfo.innerHTML = arr
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
    .join(''));
}

function cleanBlok(block) {
  block.innerHTML = '';
}
