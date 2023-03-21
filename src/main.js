import Swal from 'sweetalert2';
import sheet from './style.css';

const currencyInput = document.getElementById('currency-input');
const searchBtn = document.getElementById('search-btn');
const currencyList = document.getElementById('currency-list');
const referenceH2 = document.getElementById('reference-h2');

const addListItem = (data) => {
  try {
    const moeda = currencyInput.value;
    currencyList.innerHTML = '';
    referenceH2.innerHTML = `Valores referentes a 1 ${moeda.toUpperCase()}`;
    let currencyValues = [];
    currencyValues = Object.entries(data.rates);
    let currencies = Object.keys(data.rates);
    if (!currencies.includes(moeda.toUpperCase())) {
      throw new Error('Moeda não existente');
    }
    currencyValues.forEach((element) => {
      let div = document.createElement('div');
      div.classList.add('value-container');
      div.innerHTML = `<p><i class="fas fa-coins"></i> ${
        element[0]
      }</p> <p class="golden">${element[1].toFixed(3)}</p>`;
      currencyList.appendChild(div);
    });
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: `${e.message}`,
    });
  }
};

const handleSearch = () => {
  const moeda = currencyInput.value;
  if (moeda.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Você precisa passar uma moeda',
    });
    return;
  }
  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((response) => response.json())
    .then((data) => addListItem(data));
};

searchBtn.addEventListener('click', handleSearch);
currencyInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});
