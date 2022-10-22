const searchField = document.getElementById('stockSearchBar');
const searchBtn = document.getElementById('submitSearchBtn');
const resultTemplate = document.getElementById('searchResult');
const resultsDiv = document.getElementById('testResults');
var resultContainerActual = document.getElementById('resultContainer0');
const clickedTemplate = document.getElementById('clickedResultTemplate');
const backArrow = document.getElementById('backArrowID');

// seemingly random placement of the mobile menu js
var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var mobileMenu = document.getElementById('mobileMenuContainer');
var targetMMDisplay = mobileMenu.style.display;
var mobileMenuIcon = document.getElementById('mobileMenuIcon');

mobileMenuBtn.addEventListener('click', openMobileMenu);

function openMobileMenu() {
    if (mobileMenu.style.opacity === '0') {
        //mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '1';
        mobileMenuIcon.src = 'images/mobileCloseIcon.svg';
        mobileMenu.style.transition = "200ms";
        mobileMenu.style.transform = "translateY(8px)";

    } else if (mobileMenu.style.opacity === '1')
    {
        //mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transition = '80ms';
        mobileMenu.style.transform = 'translateY(-8px)'
        mobileMenuIcon.src = 'images/mobileMenuIcon.svg';
    }
}

//date for stock price
const date = new Date();
var stockYear = date.getFullYear();
var stockMonth = date.getMonth() + 1;
var stockDay = date.getDate() - 1;

// how do we get daily values for last 7 days?

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

// do action on click for search results
function clickResults(ticker) {
  removeAllChildNodes(resultsDiv);
  resultsDiv.appendChild(clickedTemplate.content.cloneNode(true));
  let clickedTicker = document.getElementById('clickedTicker');
  clickedTicker.innerHTML = ticker;

  //re-retrieving ticker data for clicked result
    let tickerSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=90Y463NPNKFRMA0H`;

    fetch(tickerSearch)
    .then(res => res.json())
    .then(searchData => {
          // ticker
          console.log(searchData);
          //company name
          let clickedTickerName = document.getElementById('clickedTickerName');
          let clickedTickerCurrency = document.getElementById('clickedTickerCurrency');
          let clickedTickerCountry = document.getElementById('clickedTickerCountry');
          
          clickedTickerName.innerHTML = searchData['bestMatches'][0]['2. name'];
          clickedTickerCurrency.innerHTML = searchData['bestMatches'][0]['8. currency']
          clickedTickerCountry.innerHTML = searchData['bestMatches'][0]['4. region'];
    })

    //re-retrieve ticker price
      let priceSearch = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=90Y463NPNKFRMA0H`;

      fetch(priceSearch)
      .then(res => res.json())
      .then(tickerData => {
          console.log(tickerData);
          let stockMonth0 = addZero(stockMonth);
          let stockDay0 = addZero(stockDay);
          let tickerDate = stockYear + "-" + stockMonth0 + "-" + stockDay0;
          let lastCloseDate = String(tickerDate);
          let firstPrice = tickerData['Time Series (Daily)'][lastCloseDate]['4. close'];
          let clickedTickerPrice = document.getElementById('clickedTickerPrice');
          clickedTickerPrice.innerHTML = '$' + firstPrice;
          // make new values and push to array  
            //charts js
              let chartArea = document.getElementById('chartTest');

              let testChart = new Chart(chartArea, {
                type: 'line',
                data:{
                  labels:[{
                    fontColor: '#ffffff'
                  }],
                  datasets:[{
                    label: 'Price per Share',
                    data:[],
                    showLine: true,
                    spanGaps: true,
                    fill: true,
                    /* backgroundColor: "#65836d", */
                    borderColor: "#F8714A",
                    borderWidth: 1,
                    pointBackgroundColor: "#F8714A"
                  }]
                },
                options:{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: false,
                      grace: '5%',
                    }
                  }
                }
              });
              
              //clear chart arrays for labels and prices
              testChart.data.datasets[0].data = [];
              testChart.data.labels = [];

            // 8 days ago?
            let stockDay1 = stockDay - 7;
            let stockDay1Actual = addZero(stockDay1);
            let stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay1Actual;
            let dayOfWeek = date.getDay();
            
            if((dayOfWeek - 8) === 0 || (dayOfWeek - 8) === 6 || (dayOfWeek - 8) === -1) {
              testChart.data.datasets[0].data.push('N/A');
              testChart.data.labels.push(stockDate);
            } else {
              let priceDay1 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
              testChart.data.datasets[0].data.push(priceDay1);
              testChart.data.labels.push(stockDate);
            }
            
            // 7 days ago
            let stockDay2 = stockDay - 6;
            let stockDay2Actual = addZero(stockDay2);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay2Actual;
            
              if((dayOfWeek - 7) === 0 || (dayOfWeek - 7) === 6 || (dayOfWeek - 7) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay2 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay2);
                testChart.data.labels.push(stockDate);
              }
            
            // 6 days ago
            let stockDay3 = stockDay - 5;
            let stockDay3Actual = addZero(stockDay3);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay3Actual;
            
              if((dayOfWeek - 6) === 0 || (dayOfWeek - 6) === 6 || (dayOfWeek - 6) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay3 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay3);
                testChart.data.labels.push(stockDate);
              }

            // 5 days ago
            let stockDay4 = stockDay - 4;
            let stockDay4Actual = addZero(stockDay4);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay4Actual;

              if((dayOfWeek - 5) === 0 || (dayOfWeek - 5) === 6 || (dayOfWeek - 5) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay4 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay4);
                testChart.data.labels.push(stockDate);
              }
            
            // 4 days ago
            let stockDay5 = stockDay - 3;
            let stockDay5Actual = addZero(stockDay5);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay5Actual;
            
              if((dayOfWeek - 4) === 0 || (dayOfWeek - 4) === 6 || (dayOfWeek - 4) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay5 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay5);
                testChart.data.labels.push(stockDate);
              }
            
            // 3 days ago
            let stockDay6 = stockDay - 2;
            let stockDay6Actual = addZero(stockDay6);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay6Actual;

              if((dayOfWeek - 3) === 0 || (dayOfWeek - 3) === 6 || (dayOfWeek - 3) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay6 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay6);
                testChart.data.labels.push(stockDate);
              }

            // 2 days ago
            let stockDay7 = stockDay - 1;
            let stockDay7Actual = addZero(stockDay7);
            stockDate = stockYear + "-" + stockMonth0 + "-" + stockDay7Actual;

              if((dayOfWeek - 2) === 0 || (dayOfWeek - 2) === 6 || (dayOfWeek - 2) === -1) {
                testChart.data.datasets[0].data.push('N/A');
                testChart.data.labels.push(stockDate);
              } else {
                let priceDay7 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
                testChart.data.datasets[0].data.push(priceDay7);
                testChart.data.labels.push(stockDate);
              }
            /* testChart.data.labels.push(stockDate);
              //close price 5 days ago
              let priceDay7 = tickerData['Time Series (Daily)'][stockDate]['4. close'];
              testChart.data.datasets[0].data.push(priceDay7); */

            testChart.update();
            
      })
};

// add evemt listener to back button
backArrow.addEventListener('click', clearStockData);

// click to reset stock page and input
function clearStockData() {
  searchField.value = '';
  removeAllChildNodes(resultsDiv);
  backArrow.className = 'backArrowDisabled';
}

/* autocomplete 👉 searchField.addEventListener('keyup', stockSearch); */

function stockSearch() {
  
  searchValue = searchField.value;
  let tickerSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=90Y463NPNKFRMA0H`;
  removeAllChildNodes(resultsDiv);
  backArrow.className = 'backArrowEnabled';

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