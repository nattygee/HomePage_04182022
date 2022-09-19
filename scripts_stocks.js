// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧


const searchField = document.getElementById('stockSearchBar');
const searchBtn = document.getElementById('submitSearchBtn');
const resultTemplate = document.getElementById('searchResult');
const resultsDiv = document.getElementById('testResults');

searchBtn.addEventListener('click', stockSearch);

const phTestText = document.getElementById('phTestText');

const phFetch = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=90Y463NPNKFRMA0H';

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


/* autocomplete 👉 searchField.addEventListener('keyup', stockSearch); */

function stockSearch() {
  
  searchValue = searchField.value;
  let tickerSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=90Y463NPNKFRMA0H`;
  removeAllChildNodes(resultsDiv);

  /* let compName = document.getElementById('compName');
  let compRegion = document.getElementById('compRegion');
  let compCurrency = document.getElementById('compCurrency'); */

  fetch(tickerSearch)
  .then(res => res.json())
  .then(searchData => {
    let matchesLength = searchData['bestMatches'].length;
    console.log(searchData);
    for (let i = 0; i < matchesLength; i++) {
      /* phTestText.innerHTML += searchData['bestMatches'][i]['1. symbol'] + ", " + searchData['bestMatches'][i]['2. name'] + ", " + searchData['bestMatches'][i]['4. region'] + ", " + searchData['bestMatches'][i]['8. currency'] + "<br>"; */ /* 👈 figure out how to make this dynamic*/
      resultsDiv.appendChild(resultTemplate.content.cloneNode(true));
      resultTemplate.id = resultTemplate.id.replace(/[0-9]/g, '') + i;
      console.log(resultTemplate.id);
      let compTicker = document.getElementById('compTicker');
      compTicker.id = compTicker.id.replace(/0-9/g, '') + i;
      compTicker.innerHTML = searchData['bestMatches'][i]['1. symbol'];
      /* document.getElementById('compTicker').innerHTML = "hey"; */
    };
  })
  
/*   phTestText = searchData */

}

function displayPHTest() {
  console.log('hey');
  fetch(phFetch)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    /* const stockTest = data.['Time Series (5min)']['2022-09-09 18:40:00'][1]; */
    /* phTestText.innerHTML = data['Time Series (5min)']['2022-09-09 18:40:00']['1. open']; */
  })
  fetch(tickerSearch)
  .then(res => res.json())
  .then(searchData => {
    console.log(searchData);
  })
}

/* displayPHTest(); */