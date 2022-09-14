// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
// product hunt startoooOOOOO PH PH PH PH PH PH PH!!!!!!!!!!!🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

const phFetch = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=90Y463NPNKFRMA0H';
const tickerSearch = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesla&apikey=90Y463NPNKFRMA0H';
var phTestText = document.getElementById('phTestText');

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

displayPHTest();