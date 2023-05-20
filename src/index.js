import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryOutList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener('input', debounce(fetchFun, DEBOUNCE_DELAY));

function fetchFun(name) {
  if (name.target.value.trim()) {
    fetchCountries(name)
      .then(data => meinCheck(data))
      .catch(() => {
        Notify.failure('Oops, there is no country with that name');
        cleanBlokCountryList();
        cleanBlokCountryInfo();
      });
  }
}
/**
 * получаем ответ от сервера, количество стран которое есть по нашему запросу и проверяем по условиям
 * @param {масив стран} data
 */
function meinCheck(data) {
  if (data.length > 10 || data.length < 1) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    cleanBlokCountryList();
    cleanBlokCountryInfo();
  }
  if (data.length <= 10 && data.length >= 2) {
    Notify.success('Рисуем спосок стран');
    createCountryList(data);
    cleanBlokCountryInfo();
  }
  if (data.length === 1) {
    Notify.success('Рисуем одну страну');
    cleanBlokCountryList();
    createCountryInfo(data);
  }
}

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
  <h1><img src="${svg}" alt="${alt}" width= "25" height = "25">
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

function cleanBlokCountryList() {
  refs.countryOutList.innerHTML = '';
}
function cleanBlokCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

//function cleanBlok(block) {
//  block.innerHTML = '';
//}
