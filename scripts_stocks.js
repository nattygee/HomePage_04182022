// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧


const searchField = document.getElementById('stockSearchBar');
const searchBtn = document.getElementById('submitSearchBtn');
const resultTemplate = document.getElementById('searchResult');
const resultsDiv = document.getElementById('testResults');

//date for stock price
const date = new Date();
var stockYear = date.getFullYear();
var stockMonth = date.getMonth() + 1;
var stockDay = date.getDate() - 1;
//zero for month and days below 10
function addZero(x) {
   if (x < 10) {
    return '0' + x;
   } else return x;
};

searchBtn.addEventListener('click', stockSearch);

const phTestText = document.getElementById('phTestText');

const phFetch = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=90Y463NPNKFRMA0H';

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// search using enter key press ⬇⬇⬇⬇
searchField.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

/* autocomplete 👉 searchField.addEventListener('keyup', stockSearch); */

function stockSearch() {
  
  searchValue = searchField.value;
  let tickerSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=90Y463NPNKFRMA0H`;
  removeAllChildNodes(resultsDiv);

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
        // ticker
        let compTicker = document.getElementById('compTicker');
        compTicker.id = compTicker.id.replace(/0-9/g, '') + i;
        compTicker.innerHTML = searchData['bestMatches'][i]['1. symbol'];
        //company name
        let compName = document.getElementById('compName');
        compName.id = compName.id.replace(/0-9/g, '') + i;
        compName.innerHTML = searchData['bestMatches'][i]['2. name'];
        // company region
        let compRegion = document.getElementById('compRegion');
        compRegion.id = compRegion.id.replace(/0-9/g, '') + i;
        compRegion.innerHTML = searchData['bestMatches'][i]['4. region'];
        // company currency
        let compCurrency = document.getElementById('compCurrency');
        compCurrency.id = compCurrency.id.replace(/0-9/g, '') + i;
        compCurrency.innerHTML = searchData['bestMatches'][i]['8. currency'];
        // company price
        let compPrice = document.getElementById('compPrice');
        compPrice.id = compPrice.id.replace(/0-9/g, '') + i;
    

        // RETRIEVING PRICE DATA FOR EACH RESULT BUT FREE API IS LIMITED TO 5 CALLS PER MINUTE :(
        /* let compTickerSymbol = searchData['bestMatches'][i]['1. symbol'];
        let priceSearch = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${compTickerSymbol}&apikey=90Y463NPNKFRMA0H`;

        fetch(priceSearch)
        .then(res => res.json())
        .then(tickerData => {
            console.log(tickerData);
        }) */
      }
      let compTickerSymbol = searchData['bestMatches'][0]['1. symbol'];
      let priceSearch = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${compTickerSymbol}&apikey=90Y463NPNKFRMA0H`;
      
      console.log('hey');
      fetch(priceSearch)
      .then(res => res.json())
      .then(tickerData => {
          console.log(tickerData);
          let stockMonth0 = addZero(stockMonth);
          let stockDay0 = addZero(stockDay);
          let tickerDate = stockYear + "-" + stockMonth0 + "-" + stockDay0;
          let lastCloseDate = String(tickerDate);
          let firstPrice = tickerData['Time Series (Daily)'][lastCloseDate]['4. close'];
          console.log('$' + (tickerData['Time Series (Daily)'][lastCloseDate]['4. close']));
          compPrice0.innerHTML = '$' + firstPrice;

      })
      /* // company name
      let compName = document.getElementById('compName');
      // company region
      let compRegion = document.getElementById('compRegion');
      // company currency
      let compCurrency = document.getElementById('compCurrency'); */
  })
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