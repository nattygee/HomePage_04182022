// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧


const searchField = document.getElementById('stockSearchBar');

var phTestText = document.getElementById('phTestText');

const phFetch = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=90Y463NPNKFRMA0H';




searchField.addEventListener('keyup', stockSearch);

function stockSearch() {
  
  searchValue = searchField.value;
  console.log(searchValue);

  let tickerSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=90Y463NPNKFRMA0H`;

  fetch(tickerSearch)
  .then(res => res.json())
  .then(searchData => {
    console.log(searchData);
    phTestText.innerHTML = searchData['bestMatches'][0]['2. name'];
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