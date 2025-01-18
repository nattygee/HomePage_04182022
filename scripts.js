var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var mobileMenu = document.getElementById('mobileMenuContainer');
var targetMMDisplay = mobileMenu.style.display;
var mobileMenuIcon = document.getElementById('mobileMenuIcon');

const scrollers = document.querySelectorAll(".scroller");

const lightboxInspo = document.createElement('div')
const lightboxNext = document.createElement('div')
const lightboxPrev = document.createElement('div')

lightboxInspo.id = 'lightboxInspo'
lightboxNext.id = 'lightboxNext'
lightboxPrev.id = 'lightboxPrev'

document.body.appendChild(lightboxInspo)
document.body.appendChild(lightboxNext)
document.body.appendChild(lightboxPrev)

const imagesInspo = document.querySelectorAll('.screenshotPortrait')
  
  /* based on the above (assigning div previous to imagesInspo and after imagesInspo to consts) */ 
    const nextImg = imagesInspo.nextSibling
    const prevImg = imagesInspo.previousSibling

// gallery filter buttons


const galImgs = document.querySelectorAll('.screenshotPortrait, .screenshotLandscape');
const galBtns = document.querySelectorAll('.filterBtn');
var galActiveFilters = [];

//console.log(galImgs, galBtns);

const galBtnAll = document.getElementById('galBtnAll');

for (let i = 0; i < galBtns.length; i++) {
  galBtns[i].addEventListener('click', filterActive);
}

function filterActive(e) {

  // if you tap on active, make it inactive
  if(e.target.classList.contains('filter-active')) {
    
    // if it's active, remove active filter
    e.target.classList.remove('filter-active')
    
    // find target dataset name in array and remove
    var filterDSIndex = galActiveFilters.indexOf(e.target.dataset.name)
    galActiveFilters.splice(filterDSIndex, 1)

    // apply changes to cards
    galImgs.forEach(card => {

      let dupCardCategory = card.dataset.name;
        if(dupCardCategory.includes(" ")) {
          let catArray = dupCardCategory.split(' ');
          let arrayFlag = [];

          catArray.forEach(filterItem => {
            if(!galActiveFilters.some(fltr => fltr.includes(filterItem))) {
              //card.classList.add("hide");
              arrayFlag.push(1);
            } else if(galActiveFilters.some(fltr => fltr.includes(filterItem))) {
              //card.classList.remove("hide");
              arrayFlag.push(0);
            }

            if(arrayFlag.includes(0)) {
              card.classList.remove("hide");
            } else {
              card.classList.add("hide");
            }
          });

          /* if card matches the clicked filter, hide card */
        } else if(e.target.dataset.name == card.dataset.name) {
        card.classList.add("hide");

        // if you click on any active filter, check for other active filters - if they are active and match the card dataset name, then keep revealed
        // looks like i need some correction below here 🚨 because it's saying if card includes a matching filter, remove... but i need to separate the ones with multiple filters
      }/*  else if(!galActiveFilters.some(fltr => fltr.includes(card.dataset.name))) {
        card.classList.add("hide");
      }  */
    });
 
  // if you tap on All, make all filters inactive
  } else if(e.target.classList.contains('filter-all')) {

    // reset filter buttons
    galBtns.forEach(btn => {
      btn.classList.remove('filter-active');
    });

    // make All filter active
    e.target.classList.add('filter-active');

    // empty active filters array
    galActiveFilters = [];

    // reveal all cards
    galImgs.forEach(card => {
      card.classList.remove("hide");
    });

    // note
    console.log("All filter tapped - deactivate other filters");

  } else {
    
    // if you tap on inactive filter, make active
    e.target.classList.add('filter-active');
        
    // push filter dataset name to array (galActiveFilters)
    galActiveFilters.push(e.target.dataset.name);

    // if you tap on inactive filter, make All filter inactive
    galBtns.forEach(btn => {
      if(btn.classList.contains('filter-all')) {
        btn.classList.remove('filter-active')
        }
      });


    // for each gallery card
      galImgs.forEach(card => {

        // hide card
        card.classList.add("hide");

        // test image tag/ array:
        let dupCardCategory = card.dataset.name;
        if(dupCardCategory.includes(" ")) {
            let catArray = dupCardCategory.split(' ');

            catArray.forEach(filterItem => {
              if(galActiveFilters.some(fltr => fltr.includes(filterItem))) {
                card.classList.remove("hide");
                console.log("🟩")
              } else {
                //  card.classList.add("hide")
                console.log("🟦")
              }
            });
        } else if(galActiveFilters.some(fltr => fltr.includes(dupCardCategory))) {
          card.classList.remove("hide");
          console.log("🟥")
        } else {
          if(card.dataset.name == e.target.dataset.name) {
            card.classList.remove("hide");
            console.log("🟧")
          }
        }


        

        // if the card's dataset name matches one of the active filters, reveal the card
        /* if(galActiveFilters.some(fltr => fltr.includes(card.dataset.name))) {
          
          card.classList.remove("hide");

        } */ 
      });

  }
    
    // if you tap the last active item
    var filterAllFlag = []
    galBtns.forEach(btn => {
      if (btn.classList.contains('filter-active') == false) {
        filterAllFlag.push(0)
      } else {
        filterAllFlag.push(1)
      }
    })

    if (filterAllFlag.includes(1) == false) {
      galBtnAll.classList.add('filter-active')
      // removing 'hide' class from all cards if the last active filter is tapped
      galImgs.forEach(card => {
        card.classList.remove("hide");
      })
      console.log("last filter deselected: " + e.target.dataset.name)
    }

   
    
  }


function filterImage(e) {
  setActiveBtn(e);
  galImgs.forEach(img => {
    img.classList.remove('hide');

    const imgType = parseInt(img.dataset.img);
    const btnType = parseInt(e.target.dataset.btn);

    if(imgType !== btnType) {
      img.classList.add('hide');
    }
  });
}

imagesInspo.forEach(image => {
  image.addEventListener('click', e => {
    lightboxInspo.classList.add('active')
    lightboxNext.classList.add('active')
    lightboxPrev.classList.add('active')

    const prevImgContainer = document.createElement('img')
    prevImgContainer.classList.add('lightboxImgNot')

    const imgView = document.createElement('img')
    let currentImg = image

    const nextImgContainer = document.createElement('img')
    nextImgContainer.classList.add('lightboxImgNot')


    //const nextOne = image.nextElementSibling
    //const prevOne = image.previousElementSibling

    const targetImgSrc = image.querySelector('div > img')
    imgView.src = targetImgSrc.src    
    
    const prevImgSrc1 = currentImg.previousElementSibling
    const prevImg1 = prevImgSrc1.querySelector('div > img')
    prevImgContainer.src = prevImg1.src

    const nextImgSrc1 = currentImg.nextElementSibling
    const nextImg1 = nextImgSrc1.querySelector('div > img')
    nextImgContainer.src = nextImg1.src



    while (lightboxInspo.firstChild) {
      lightboxInspo.removeChild(lightboxInspo.firstChild)
    }
    
    lightboxInspo.appendChild(prevImgContainer)
    lightboxInspo.appendChild(imgView)
    lightboxInspo.appendChild(nextImgContainer)

// should probably spend some time to make these separate functions to apply to the 4 event listeners
    // next button to switch images?
    lightboxNext.addEventListener('click', e => {
      const nextOne = currentImg.nextElementSibling
        const nextImg = nextOne.querySelector('div > img')
        
        // switch previous image to clicked image before switching middle image container to the next sibling of the clicked image
        prevImgContainer.src = imgView.src

      imgView.src = nextImg.src

      // next element sibling for upcoming image
      const nextImgContainerSibling = nextOne.nextElementSibling
      const upcomingImg = nextImgContainerSibling.querySelector('div > img')
      nextImgContainer.src = upcomingImg.src

      currentImg = nextOne

    })

    // prev button to switch images?
    lightboxPrev.addEventListener('click', e => {
      const prevOne = currentImg.previousElementSibling
        const prevImg = prevOne.querySelector('div > img')

        nextImgContainer.src = imgView.src

        // left arrow key switches upcoming image
        const prevImgContainerSibling = prevOne.previousElementSibling
        const lastImg = prevImgContainerSibling.querySelector('div > img')
        prevImgContainer.src = lastImg.src  

      imgView.src = prevImg.src
      currentImg = prevOne
    })

    // right arrow key to switch images?
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const nextOne = currentImg.nextElementSibling
        const nextImg = nextOne.querySelector('div > img')

        // right arrow key switches upcoming image
        const nextImgContainerSibling = nextOne.nextElementSibling
        const upcomingImg = nextImgContainerSibling.querySelector('div > img')
        nextImgContainer.src = upcomingImg.src
        prevImgContainer.src = imgView.src

        // right arrow key hover state for keypress affordance (flashes orange)
        lightboxNext.classList.add('hover')
        document.addEventListener('keyup', (e) => {
          lightboxNext.classList.remove('hover')
        })

      imgView.src = nextImg.src
      currentImg = nextOne
      }

      if (e.key === 'Escape') {
        lightboxInspo.classList.remove('active')
        lightboxNext.classList.remove('active')
        lightboxPrev.classList.remove('active')
      }
    })

     // left arrow key to switch images?
     document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        const prevOne = currentImg.previousElementSibling
        const prevImg = prevOne.querySelector('div > img')

        // left arrow key switches upcoming image
        const prevImgContainerSibling = prevOne.previousElementSibling
        const lastImg = prevImgContainerSibling.querySelector('div > img')
        prevImgContainer.src = lastImg.src
        nextImgContainer.src = imgView.src

        // right arrow key hover state for keypress affordance (flashes orange)
        lightboxPrev.classList.add('hover')
        document.addEventListener('keyup', (e) => {
          lightboxPrev.classList.remove('hover')
        })

      imgView.src = prevImg.src
      currentImg = prevOne
      }
    })

  })
})

lightboxInspo.addEventListener('click', e => {
  if(e.target !== e.currentTarget) return
lightboxInspo.classList.remove('active')
lightboxNext.classList.remove('active')
lightboxPrev.classList.remove('active')
})


/* let foos = document.querySelectorAll(".UIdesign")

// show hide button
document.getElementById("mobileUIBtn").addEventListener("click", function() {
  foos.forEach(function(el){
    el.classList.toggle("hidden");
  });
});

function filterInspo(c) {
  var x, i;
  x = document.getElementsByClassName("")
}
 */
// banner scroller

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach(scroller => {
      scroller.setAttribute("data-animated", true);
    });
  }



// images for outfits

  //image containers
  var outfitImgNow = document.getElementById('outfitImgNow');
  var outfitImg6 = document.getElementById('outfitImg6');
  var outfitImg12 = document.getElementById('outfitImg12');

  //image arrays
  var rainSpringFall = [];
    rainSpringFall.push('images/outfit_RT_summer1_1.png', 'images/outfit_RT_summer1_2.png', 'images/outfit_RT_summer1_3.png');

    function randomArrayValue(arr) {
      //get random number below array length
      const randomValue = Math.floor(Math.random() * arr.length);

      //assign random array number VALUE to a variable
      const getNum = arr[randomValue];

      //return the variable to the function called
      return getNum;
    }

    const rainyDayImg = randomArrayValue(rainSpringFall);

  var rainSummer1 = [];
    rainSummer1.push('images/outfit_RT_summer1_1.png', 'images/outfit_RT_summer1_2.png', 'images/outfit_RT_summer1_3.png');
  var rainSummer2 = [];
    rainSummer2.push('images/outfit_RT_summer2_1.png', 'images/outfit_RT_summer2_2.png', 'images/outfit_RT_summer2_3.png');
  var rainDeath = [];
    rainDeath.push('images/outfit_RT_death.png')

  var drizzleSpringFall = [];
    drizzleSpringFall.push('images/outfit_drz_summer1_1.png', 'images/outfit_drz_summer1_2.png', 'images/outfit_drz_summer1_3.png');
  var drizzleSummer1 = [];
    drizzleSummer1.push('images/outfit_drz_summer1_1.png', 'images/outfit_drz_summer1_2.png', 'images/outfit_drz_summer1_3.png');
  var drizzleSummer2 = [];
    drizzleSummer2.push('images/outfit_drz_summer2_1.png', 'images/outfit_drz_summer2_2.png', 'images/outfit_drz_summer2_3.png');
  var drizzleDeath = [];
    drizzleDeath.push('images/outfit_drz_death.png');

  var clearSpringFall = [];
    clearSpringFall.push('images/nightSummer1.png', 'images/outfit_OC_summer1_1.png', 'images/outfit_OC_summer1_2.png', 'images/outfit_OC_summer1_3.png');
  var clearSummer1 = [];
    clearSummer1.push('images/morningSummer1.png', 'images/outfit_clear_summer1_1.png', 'images/outfit_clear_summer1_2.png', 'images/outfit_clear_summer1_3.png');
  var clearSummer2 = [];
    clearSummer2.push('images/outfit_clear_summer2_1.png', 'images/outfit_clear_summer2_2.png', 'images/outfit_clear_summer2_3.png');
  var clearDeath = []; 
    clearDeath.push('outfit_clear_death.png');

  var overcastSpringFall = [];
    overcastSpringFall.push('images/nightSummer1.png', 'images/outfit_OC_summer1_1.png', 'images/outfit_OC_summer1_2.png', 'images/outfit_OC_summer1_3.png');

  var overcastSummer1 = [];
    overcastSummer1.push('images/nightSummer1.png', 'images/outfit_OC_summer1_1.png', 'images/outfit_OC_summer1_2.png', 'images/outfit_OC_summer1_3.png');
  var overcastSummer2 = [];
    overcastSummer2.push('images/outfit_OC_summer2_1.png', 'images/outfit_OC_summer2_2.png', 'images/outfit_OC_summer2_3.png');
  var overcastDeath = [];
    overcastDeath.push('images/outfit_OC_death.png');

// seemingly random placement of the mobile menu js

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

// getting date and time

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

var dayReading = new Date();

var dayOfWeek = days[dayReading.getDay()];
var monthOfYear = months[dayReading.getMonth()];
var dayOfMonth = dayReading.getDate();

document.getElementById("dateReading").innerHTML = dayOfWeek + ", " + monthOfYear + " " + dayOfMonth;

function updateClock () {
  var hoursNumber = dayReading.getHours();
  var hourReading = hours[dayReading.getHours()];
  var minuteOfHour = dayReading.getMinutes();
  var ampmReading = "AM";
  var ampm = dayOrNight();

    function dayOrNight() {
      if (hoursNumber < 12) { 
        ampmReading = "AM";
      } else if (hoursNumber >= 12) {
        ampmReading = "PM";
      }
    }
  dayOrNight();
  
    function addMinute0() {
      if (minuteOfHour < 10) {
        minuteOfHour = '0' + minuteOfHour;
      } else if (minuteOfHour >= 10) {
        minuteOfHour = minuteOfHour;
      };
    }
    addMinute0();

  document.getElementById('timeReading').innerHTML = hourReading + ":" + minuteOfHour + " " + ampmReading;

  setTimeout(updateClock, 1000);
  console.log("clock worked");
}

updateClock();

// adding times to relevant outfit sections

function outfitTimes() {
  
  var hourReading = hours[dayReading.getHours()];
  var hoursNumber = dayReading.getHours();
  
  // calculating 6 hours ahead
  var hoursPlus6ampm = Number(hoursNumber) + 6;
  var hoursPlus6 = Number(hourReading) + 6;
  var time6HoursAhead = hours[hoursPlus6];
  
  // calculating 12 hours ahead
  var hoursPlus12ampm = Number(hoursNumber) + 12;
  var hoursPlus12 = Number(hourReading) + 12;
  var time12HoursAhead = hours[hoursPlus12];

  console.log(time6HoursAhead);
  var ampmCurrent;
  var ampmPlus6;
  var ampmPlus12;

    function dayOrNight() {
      if (hoursNumber + 1 < 12) { 
        ampmCurrent = "AM";
      } else if (hoursNumber + 1 >= 12) {
        ampmCurrent = "PM";
      }
    }
    function dayOrNight6() {
      if (hoursPlus6ampm < 12 || hoursPlus6ampm > 24) { 
        ampmPlus6 = "AM";
      } else if (hoursPlus6ampm >= 12 || hoursPlus6ampm <= 24) {
        ampmPlus6 = "PM";
      }
    }
    function dayOrNight12() {
      if (hoursPlus12ampm < 12 || hoursPlus12ampm > 24) { 
        ampmPlus12 = "AM";
      } else if (hoursPlus12ampm >= 12 || hoursPlus12ampm <= 24) {
        ampmPlus12 = "PM";
      }
    }
  dayOrNight();
  dayOrNight6();
  dayOrNight12();

  document.getElementById('currentTimeEstimate').innerHTML = Number(hourReading) + 1 + ':00 ' + ampmCurrent;
  document.getElementById('plus6HourEst').innerHTML = time6HoursAhead + ':00 ' + ampmPlus6;
  document.getElementById('plus12HourEst').innerHTML = time12HoursAhead + ':00 ' + ampmPlus12;
}

// searching for users location after they hit the little location button
document.getElementById('locationBtn').addEventListener('click', getWeatherData);

function testForLocation() {
  console.log('hey')
  if ('geolocation' in navigator) {
    // run function to get position, translate coords into city, place in input innerHTML
    navigator.geolocation.getCurrentPosition( function getLocation(usersLocation) {
        const lat = usersLocation.coords.latitude;
        const long = usersLocation.coords.longitude;

        const revGeoCode = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${long}&localityLanguage=en&key=bdc_5e1833e9cd144f95898a52842573289d`

        fetch(revGeoCode)
          .then(res => res.json())
          .then(data => {
            document.getElementById('cityInput').value = data.city;
          })
        
        console.log(lat + ' ' + long);
    });
  
    } else {
    // show message asking to allow location (if location is desired)
  
  };
}

// rigging the shuffle button up

  // add id + event listener to shuffle button  
var shuffleBtn = document.getElementById('shuffBtn');
shuffleBtn.addEventListener('click', shuffleImgs);

  // set empty variables to identify the weather condition
var imgArrayCurrent;
var imgArray6;
var imgArray12;

  // run random number selection for relevant img array
function shuffleImgs() {
  outfitImgNow.src = randomArrayValue(imgArrayCurrent);
  outfitImg6.src = randomArrayValue(imgArray6);
  outfitImg12.src = randomArrayValue(imgArray12);
};

  // enable shuffle button once you hit the button or search

function enableShuffleBtn() {
  shuffleBtn.classList.remove('shuffleBtnDisabled');
  shuffleBtn.classList.add('shuffleBtn');
};



function findTemps() {
  if('geolocation' in navigator) {
    console.log("we tempeen");
    navigator.geolocation.getCurrentPosition( function getLocation(location) {
      const latti = location.coords.latitude;
      const longo = location.coords.longitude;

      
      /* const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latti}lon=${longo}&appid=c3c439bb6b1cdf0cddfbc45865181dc6&units=metric`; */
      
      // current weather call
      const currentWeatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latti}&lon=${longo}&appid=c3c439bb6b1cdf0cddfbc45865181dc6&units=metric`;
      
      fetch(currentWeatherData)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //assigning current temp to variable
          const tempCurrent = Math.round(data['main']['temp']);
          document.getElementById('morningTempNum').innerHTML = tempCurrent + '°';

          //assigning current weather description ID to variable
          const conditionCurrent = data['weather'][0]['id'];
          document.getElementById('currentWeatherDesc').innerHTML = data['weather'][0]['description'];
          
          // find image for slot 1
          function loadOutfitsCurrent() {
              //spring/Fall 10º - 16º
              if (tempCurrent >= 10 && tempCurrent < 17 && conditionCurrent === 800) {
                outfitImgNow.src = randomArrayValue(clearSpringFall);
                imgArrayCurrent = clearSpringFall;
              } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
                outfitImgNow.src = randomArrayValue(drizzleSpringFall);
                imgArrayCurrent = drizzleSpringFall;
              } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
                outfitImgNow.src = randomArrayValue(rainSpringFall);
                imgArrayCurrent = rainSpringFall;
              } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
                outfitImgNow.src = randomArrayValue(rainSpringFall);
                imgArrayCurrent = rainSpringFall;
              } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent === 701 || conditionCurrent === 741)) {
                outfitImgNow.src = randomArrayValue(drizzleSpringFall);
                imgArrayCurrent = drizzleSpringFall;
              } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
                outfitImgNow.src = randomArrayValue(overcastSpringFall);
                imgArrayCurrent = overcastSpringFall;
              }
              
              //summer1 17º - 27º
              else if (tempCurrent >= 17 && tempCurrent < 28 && conditionCurrent === 800) {
                outfitImgNow.src = randomArrayValue(clearSummer1);
                imgArrayCurrent = clearSummer1;
              } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
                outfitImgNow.src = randomArrayValue(drizzleSummer1);
                imgArrayCurrent = drizzleSummer1;
              } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
                outfitImgNow.src = randomArrayValue(rainSummer1);
                imgArrayCurrent = rainSummer1;
              } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
                outfitImgNow.src = randomArrayValue(rainSummer1);
                imgArrayCurrent = rainSummer1;
              } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent === 701 || conditionCurrent === 741)) {
                outfitImgNow.src = randomArrayValue(drizzleSummer1);
                imgArrayCurrent = drizzleSummer1;
              } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
                outfitImgNow.src = randomArrayValue(overcastSummer1);
                imgArrayCurrent = overcastSummer1;
              }

              //summer2 28º - 34º
              else if (tempCurrent >= 28 && tempCurrent < 35 && conditionCurrent === 800) {
                outfitImgNow.src = randomArrayValue(clearSummer2);
                imgArrayCurrent = clearSummer2;
              } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
                outfitImgNow.src = randomArrayValue(drizzleSummer2);
                imgArrayCurrent = drizzleSummer2;
              } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
                outfitImgNow.src = randomArrayValue(rainSummer2);
                imgArrayCurrent = rainSummer2;
              } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
                outfitImgNow.src = randomArrayValue(rainSummer2);
                imgArrayCurrent = rainSummer2;
              } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent === 701 || conditionCurrent === 741)) {
                outfitImgNow.src = randomArrayValue(drizzleSummer2);
                imgArrayCurrent = drizzleSummer2;
              } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
                outfitImgNow.src = randomArrayValue(overcastSummer2);
                imgArrayCurrent = overcastSummer2;
              }

              //death 35º+
              else if (tempCurrent >= 35 && conditionCurrent === 800) {
                outfitImgNow.src = randomArrayValue(clearDeath);
                imgArrayCurrent = clearDeath;
              } else if (tempCurrent >= 35 && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
                outfitImgNow.src = randomArrayValue(drizzleDeath);
                imgArrayCurrent = drizzleDeath;
              } else if (tempCurrent >= 35 && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
                outfitImgNow.src = randomArrayValue(rainDeath);
                imgArrayCurrent = rainDeath;
              } else if (tempCurrent >= 35 && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
                outfitImgNow.src = randomArrayValue(rainDeath);
                imgArrayCurrent = rainDeath;
              } else if (tempCurrent >= 35 && (conditionCurrent === 701 || conditionCurrent === 741)) {
                outfitImgNow.src = randomArrayValue(drizzleDeath);
                imgArrayCurrent = drizzleDeath;
              } else if (tempCurrent >= 35 && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
                outfitImgNow.src = randomArrayValue(overcastDeath);
                imgArrayCurrent = overcastDeath;
              }
            }
          loadOutfitsCurrent();
          });
    
// making note for no reason          

      // multiday call url
      const futureWeatherData = `https://api.openweathermap.org/data/2.5/forecast?lat=${latti}&lon=${longo}&cnt=5&appid=c3c439bb6b1cdf0cddfbc45865181dc6&units=metric`;
      
      fetch(futureWeatherData)
        .then(res => res.json())
        .then(data => {
          const temp6hr = Math.round(data['list'][1]['main']['temp']);
          document.getElementById('dayTempNum').innerHTML = temp6hr + '°';
          
          const temp12hr = Math.round(data['list'][3]['main']['temp']);
          document.getElementById('nightTempNum').innerHTML = temp12hr + '°';

          //assigning the weather condition ID to a variable
          const conditionID6 = data['list'][1]['weather'][0]['id'];
          const conditionID12 = data['list'][3]['weather'][0]['id'];
          document.getElementById('plus3HourDesc').innerHTML = data['list'][1]['weather'][0]['description'];
          document.getElementById('plus6HourDesc').innerHTML = data['list'][3]['weather'][0]['description'];
          
          console.log(data);
          // slot 2
          function loadOutfits6() {
              //spring/Fall 10º - 16º
              if (temp6hr >= 10 && temp6hr < 17 && conditionID6 === 800) {
                outfitImg6.src = randomArrayValue(clearSpringFall);
                imgArray6 = clearSpringFall;
              } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 300 && conditionID6 <= 321)) {
                outfitImg6.src = randomArrayValue(drizzleSpringFall);
                imgArray6 = drizzleSpringFall;
              } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 200 && conditionID6 <= 232)) {
                outfitImg6.src = randomArrayValue(rainSpringFall);
                imgArray6 = rainSpringFall;
              } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 500 && conditionID6 <= 531)) {
                outfitImg6.src = randomArrayValue(rainSpringFall);
                imgArray6 = rainSpringFall;
              } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 === 701 || conditionID6 === 741)) {
                outfitImg6.src = randomArrayValue(drizzleSpringFall);
                imgArray6 = drizzleSpringFall;
              } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 801 && conditionID6 <= 804)) {
                outfitImg6.src = randomArrayValue(overcastSpringFall);
                imgArray6 = overcastSpringFall;
              } 
              
              //summer1 17º - 27º
              else if (temp6hr >= 17 && temp6hr < 28 && conditionID6 === 800) {
                outfitImg6.src = randomArrayValue(clearSummer1);
                imgArray6 = clearSummer1;
              } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 300 && conditionID6 <= 321)) {
                outfitImg6.src = randomArrayValue(drizzleSummer1);
                imgArray6 = drizzleSummer1;
              } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 200 && conditionID6 <= 232)) {
                outfitImg6.src = randomArrayValue(rainSummer1);
                imgArray6 = rainSummer1;
              } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 500 && conditionID6 <= 531)) {
                outfitImg6.src = randomArrayValue(rainSummer1);
                imgArray6 = rainSummer1;
              } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 === 701 || conditionID6 === 741)) {
                outfitImg6.src = randomArrayValue(drizzleSummer1);
                imgArray6 = drizzleSummer1;
              } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 801 && conditionID6 <= 804)) {
                outfitImg6.src = randomArrayValue(overcastSummer1);
                imgArray6 = overcastSummer1;
              }

              //summer2 28º - 34º
              else if (temp6hr >= 28 && temp6hr < 35 && conditionID6 === 800) {
                outfitImg6.src = randomArrayValue(clearSummer2);
                imgArray6 = clearSummer2;
              } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 300 && conditionID6 <= 321)) {
                outfitImg6.src = randomArrayValue(drizzleSummer2);
                imgArray6 = drizzleSummer2;
              } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 200 && conditionID6 <= 232)) {
                outfitImg6.src = randomArrayValue(rainSummer2);
                imgArray6 = rainSummer2;
              } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 500 && conditionID6 <= 531)) {
                outfitImg6.src = randomArrayValue(rainSummer2);
                imgArray6 = rainSummer2;
              } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 === 701 || conditionID6 === 741)) {
                outfitImg6.src = randomArrayValue(drizzleSummer2);
                imgArray6 = drizzleSummer2;
              } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 801 && conditionID6 <= 804)) {
                outfitImg6.src = randomArrayValue(overcastSummer2);
                imgArray6 = overcastSummer2;
              }

              //death 35º+
              else if (temp6hr >= 35 && conditionID6 === 800) {
                outfitImg6.src = randomArrayValue(clearDeath);
                imgArray6 = clearDeath;
              } else if (temp6hr >= 35 && (conditionID6 >= 300 && conditionID6 <= 321)) {
                outfitImg6.src = randomArrayValue(drizzleDeath);
                imgArray6 = drizzleDeath;
              } else if (temp6hr >= 35 && (conditionID6 >= 200 && conditionID6 <= 232)) {
                outfitImg6.src = randomArrayValue(rainDeath);
                imgArray6 = rainDeath;
              } else if (temp6hr >= 35 && (conditionID6 >= 500 && conditionID6 <= 531)) {
                outfitImg6.src = randomArrayValue(rainDeath);
                imgArray6 = rainDeath;
              } else if (temp6hr >= 35 && (conditionID6 === 701 || conditionID6 === 741)) {
                outfitImg6.src = randomArrayValue(drizzleDeath);
                imgArray6 = drizzleDeath;
              } else if (temp6hr >= 35 && (conditionID6 >= 801 && conditionID6 <= 804)) {
                outfitImg6.src = randomArrayValue(overcastDeath);
                imgArray6 = overcastDeath;
              }
          }
          loadOutfits6();

          function loadOutfits12() {
            //spring/Fall 10º - 16º
            if (temp12hr >= 10 && temp12hr < 17 && conditionID12 === 800) {
              outfitImg12.src = randomArrayValue(clearSpringFall);
              imgArray12 = clearSpringFall;
            } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 300 && conditionID12 <= 321)) {
              outfitImg12.src = randomArrayValue(drizzleSpringFall);
              imgArray12 = drizzleSpringFall;
            } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 200 && conditionID12 <= 232)) {
              outfitImg12.src = randomArrayValue(rainSpringFall);
              imgArray12 = rainSpringFall;
            } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 500 && conditionID12 <= 531)) {
              outfitImg12.src = randomArrayValue(rainSpringFall);
              imgArray12 = rainSpringFall;
            } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 === 701 || conditionID12 === 741)) {
              outfitImg12.src = randomArrayValue(drizzleSpringFall);
              imgArray12 = drizzleSpringFall;
            } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 801 && conditionID12 <= 804)) {
              outfitImg12.src = randomArrayValue(overcastSpringFall);
              imgArray12 = overcastSpringFall;
            } 
            
            //summer1 17º - 27º
            else if (temp12hr >= 17 && temp12hr < 28 && conditionID12 === 800) {
              outfitImg12.src = randomArrayValue(clearSummer1);
              imgArray12 = clearSummer1;
            } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 300 && conditionID12 <= 321)) {
              outfitImg12.src = randomArrayValue(drizzleSummer1);
              imgArray12 = drizzleSummer1;
            } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 200 && conditionID12 <= 232)) {
              outfitImg12.src = randomArrayValue(rainSummer1);
              imgArray12 = rainSummer1;
            } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 500 && conditionID12 <= 531)) {
              outfitImg12.src = randomArrayValue(rainSummer1);
              imgArray12 = rainSummer1;
            } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 === 701 || conditionID12 === 741)) {
              outfitImg12.src = randomArrayValue(drizzleSummer1);
              imgArray12 = drizzleSummer1;
            } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 801 && conditionID12 <= 804)) {
              outfitImg12.src = randomArrayValue(overcastSummer1);
              imgArray12 = overcastSummer1;
            }

            //summer2 28º - 34º
            else if (temp12hr >= 28 && temp12hr < 35 && conditionID12 === 800) {
              outfitImg12.src = randomArrayValue(clearSummer2);
              imgArray12 = clearSummer2;
            } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 300 && conditionID12 <= 321)) {
              outfitImg12.src = randomArrayValue(drizzleSummer2);
              imgArray12 = drizzleSummer2;
            } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 200 && conditionID12 <= 232)) {
              outfitImg12.src = randomArrayValue(rainSummer2);
              imgArray12 = rainSummer2;
            } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 500 && conditionID12 <= 531)) {
              outfitImg12.src = randomArrayValue(rainSummer2);
              imgArray12 = rainSummer2;
            } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 === 701 || conditionID12 === 741)) {
              outfitImg12.src = randomArrayValue(drizzleSummer2);
              imgArray12 = drizzleSummer2;
            } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 801 && conditionID12 <= 804)) {
              outfitImg12.src = randomArrayValue(overcastSummer2);
              imgArray12 = overcastSummer2;
            }

            //death 35º+
            else if (temp12hr >= 35 && conditionID12 === 800) {
              outfitImg12.src = randomArrayValue(clearDeath);
              imgArray12 = clearDeath;
            } else if (temp12hr >= 35 && (conditionID12 >= 300 && conditionID12 <= 321)) {
              outfitImg12.src = randomArrayValue(drizzleDeath);
              imgArray12 = drizzleDeath;
            } else if (temp12hr >= 35 && (conditionID12 >= 200 && conditionID12 <= 232)) {
              outfitImg12.src = randomArrayValue(rainDeath);
              imgArray12 = rainDeath;
            } else if (temp12hr >= 35 && (conditionID12 >= 500 && conditionID12 <= 531)) {
              outfitImg12.src = randomArrayValue(rainDeath);
              imgArray12 = rainDeath;
            } else if (temp12hr >= 35 && (conditionID12 === 701 || conditionID12 === 741)) {
              outfitImg12.src = randomArrayValue(drizzleDeath);
              imgArray12 = drizzleDeath;
            } else if (temp12hr >= 35 && (conditionID12 >= 801 && conditionID12 <= 804)) {
              outfitImg12.src = randomArrayValue(overcastDeath);
              imgArray12 = overcastDeath;
            }
        }
        loadOutfits12();
        });
    
    
          //function to place image from array INTO image containers somehow...
        
  });
  
  } else {

  };
  enableShuffleBtn();
}

function getWeatherData() {
  testForLocation();
  findTemps();
  outfitTimes();
};

/* let getWeatherData = () => {
  testForLocation();
  findTemps();
}; */

console.log(navigator.geolocation.getCurrentPosition(console.log, console.log));

//image slides
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 4000); // Change image every 2 seconds
}

// creating small function for city search autocomplete :)

function citySearchAutoComp() {

    // get times dawg
    outfitTimes();
    
    // pull place details from selected autocomplete suggestion
    var citySearchInput = document.getElementById('cityInput');
    var autoCompleteVar = new google.maps.places.Autocomplete(citySearchInput);

    // add event listener to the autocomplete results
    /* autoCompleteVar.addListener('place_changed', searchTemps()); */

  autoCompleteVar.addListener('place_changed', function searchTemps() {

    // assign resulting object of selected autocomplete result to a variable
    var acPlace = autoCompleteVar.getPlace();

    // pull lat and long from said object
    var searchLat = acPlace.geometry.location.lat();
    var searchLong = acPlace.geometry.location.lng();
    // make api call with the lat and long from selected autocomplete result
    const currentWeatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${searchLat}&lon=${searchLong}&appid=c3c439bb6b1cdf0cddfbc45865181dc6&units=metric`;

    fetch(currentWeatherData)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //assigning current temp to variable
        const tempCurrent = Math.round(data['main']['temp']);
        document.getElementById('morningTempNum').innerHTML = tempCurrent + '°';

        //assigning current weather description ID to variable
          const conditionCurrent = data['weather'][0]['id'];
          document.getElementById('currentWeatherDesc').innerHTML = data['weather'][0]['description'];

        //get images for slot1 (current)
        function loadOutfitsCurrent() {
          //spring/Fall 10º - 16º
          if (tempCurrent >= 10 && tempCurrent < 17 && conditionCurrent === 800) {
            outfitImgNow.src = randomArrayValue(clearSpringFall);
            imgArrayCurrent = clearSpringFall;
          } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
            outfitImgNow.src = randomArrayValue(drizzleSpringFall);
            imgArrayCurrent = drizzleSpringFall;
          } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
            outfitImgNow.src = randomArrayValue(rainSpringFall);
            imgArrayCurrent = rainSpringFall;
          } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
            outfitImgNow.src = randomArrayValue(rainSpringFall);
            imgArrayCurrent = rainSpringFall;
          } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent === 701 || conditionCurrent === 741)) {
            outfitImgNow.src = randomArrayValue(drizzleSpringFall);
            imgArrayCurrent = drizzleSpringFall;
          } else if ((tempCurrent >= 10 && tempCurrent < 17) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
            outfitImgNow.src = randomArrayValue(overcastSpringFall);
            imgArrayCurrent = overcastSpringFall;
          }
          
          //summer1 17º - 27º
          else if (tempCurrent >= 17 && tempCurrent < 28 && conditionCurrent === 800) {
            outfitImgNow.src = randomArrayValue(clearSummer1);
            imgArrayCurrent = clearSummer1;
          } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
            outfitImgNow.src = randomArrayValue(drizzleSummer1);
            imgArrayCurrent = drizzleSummer1;
          } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
            outfitImgNow.src = randomArrayValue(rainSummer1);
            imgArrayCurrent = rainSummer1;
          } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
            outfitImgNow.src = randomArrayValue(rainSummer1);
            imgArrayCurrent = rainSummer1;
          } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent === 701 || conditionCurrent === 741)) {
            outfitImgNow.src = randomArrayValue(drizzleSummer1);
            imgArrayCurrent = drizzleSummer1;
          } else if ((tempCurrent >= 17 && tempCurrent < 28) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
            outfitImgNow.src = randomArrayValue(overcastSummer1);
            imgArrayCurrent = overcastSummer1;
          }

          //summer2 28º - 34º
          else if (tempCurrent >= 28 && tempCurrent < 35 && conditionCurrent === 800) {
            outfitImgNow.src = randomArrayValue(clearSummer2);
            imgArrayCurrent = clearSummer2;
          } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
            outfitImgNow.src = randomArrayValue(drizzleSummer2);
            imgArrayCurrent = drizzleSummer2;
          } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
            outfitImgNow.src = randomArrayValue(rainSummer2);
            imgArrayCurrent = rainSummer2;
          } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
            outfitImgNow.src = randomArrayValue(rainSummer2);
            imgArrayCurrent = rainSummer2;
          } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent === 701 || conditionCurrent === 741)) {
            outfitImgNow.src = randomArrayValue(drizzleSummer2);
            imgArrayCurrent = drizzleSummer2;
          } else if ((tempCurrent >= 28 && tempCurrent < 35) && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
            outfitImgNow.src = randomArrayValue(overcastSummer2);
            imgArrayCurrent = overcastSummer2;
          }

          //death 35º+
          else if (tempCurrent >= 35 && conditionCurrent === 800) {
            outfitImgNow.src = randomArrayValue(clearDeath);
            imgArrayCurrent = clearDeath;
          } else if (tempCurrent >= 35 && (conditionCurrent >= 300 && conditionCurrent <= 321)) {
            outfitImgNow.src = randomArrayValue(drizzleDeath);
            imgArrayCurrent = drizzleDeath;
          } else if (tempCurrent >= 35 && (conditionCurrent >= 200 && conditionCurrent <= 232)) {
            outfitImgNow.src = randomArrayValue(rainDeath);
            imgArrayCurrent = rainDeath;
          } else if (tempCurrent >= 35 && (conditionCurrent >= 500 && conditionCurrent <= 531)) {
            outfitImgNow.src = randomArrayValue(rainDeath);
            imgArrayCurrent = rainDeath;
          } else if (tempCurrent >= 35 && (conditionCurrent === 701 || conditionCurrent === 741)) {
            outfitImgNow.src = randomArrayValue(drizzleDeath);
            imgArrayCurrent = drizzleDeath;
          } else if (tempCurrent >= 35 && (conditionCurrent >= 801 && conditionCurrent <= 804)) {
            outfitImgNow.src = randomArrayValue(overcastDeath);
            imgArrayCurrent = overcastDeath;
          }
        }
        loadOutfitsCurrent();
      });

      /* loadOutfits(); */
  

    // multiday call url
    const futureWeatherData = `https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLong}&cnt=5&appid=c3c439bb6b1cdf0cddfbc45865181dc6&units=metric`;
    
    fetch(futureWeatherData)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        //autocomplete assign temp for 6hr slot
        const temp6hr = Math.round(data['list'][1]['main']['temp']);
        document.getElementById('dayTempNum').innerHTML = temp6hr + '°';

        //autocomplete assign temp for 12hr slot
        const temp12hr = Math.round(data['list'][3]['main']['temp']);
        document.getElementById('nightTempNum').innerHTML = temp12hr + '°';

        //check weather description id to match to possible outfit images
        const conditionID6 = data['list'][1]['weather'][0]['id'];
        const conditionID12 = data['list'][3]['weather'][0]['id'];
        document.getElementById('plus3HourDesc').innerHTML = data['list'][1]['weather'][0]['description'];
        document.getElementById('plus6HourDesc').innerHTML = data['list'][3]['weather'][0]['description'];

        // slot 2
        function loadOutfits6() {
          //spring/Fall 10º - 16º
          if (temp6hr >= 10 && temp6hr < 17 && conditionID6 === 800) {
            outfitImg6.src = randomArrayValue(clearSpringFall);
            imgArray6 = clearSpringFall;
          } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 300 && conditionID6 <= 321)) {
            outfitImg6.src = randomArrayValue(drizzleSpringFall);
            imgArray6 = drizzleSpringFall;
          } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 200 && conditionID6 <= 232)) {
            outfitImg6.src = randomArrayValue(rainSpringFall);
            imgArray6 = rainSpringFall;
          } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 500 && conditionID6 <= 531)) {
            outfitImg6.src = randomArrayValue(rainSpringFall);
            imgArray6 = rainSpringFall;
          } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 === 701 || conditionID6 === 741)) {
            outfitImg6.src = randomArrayValue(drizzleSpringFall);
            imgArray6 = drizzleSpringFall;
          } else if ((temp6hr >= 10 && temp6hr < 17) && (conditionID6 >= 801 && conditionID6 <= 804)) {
            outfitImg6.src = randomArrayValue(overcastSpringFall);
            imgArray6 = overcastSpringFall;
          } 
          
          //summer1 17º - 27º
          else if (temp6hr >= 17 && temp6hr < 28 && conditionID6 === 800) {
            outfitImg6.src = randomArrayValue(clearSummer1);
            imgArray6 = clearSummer1;
          } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 300 && conditionID6 <= 321)) {
            outfitImg6.src = randomArrayValue(drizzleSummer1);
            imgArray6 = drizzleSummer1;
          } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 200 && conditionID6 <= 232)) {
            outfitImg6.src = randomArrayValue(rainSummer1);
            imgArray6 = rainSummer1;
          } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 500 && conditionID6 <= 531)) {
            outfitImg6.src = randomArrayValue(rainSummer1);
            imgArray6 = rainSummer1;
          } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 === 701 || conditionID6 === 741)) {
            outfitImg6.src = randomArrayValue(drizzleSummer1);
            imgArray6 = drizzleSummer1;
          } else if ((temp6hr >= 17 && temp6hr < 28) && (conditionID6 >= 801 && conditionID6 <= 804)) {
            outfitImg6.src = randomArrayValue(overcastSummer1);
            imgArray6 = overcastSummer1;
          }

          //summer2 28º - 34º
          else if (temp6hr >= 28 && temp6hr < 35 && conditionID6 === 800) {
            outfitImg6.src = randomArrayValue(clearSummer2);
            imgArray6 = clearSummer2;
          } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 300 && conditionID6 <= 321)) {
            outfitImg6.src = randomArrayValue(drizzleSummer2);
            imgArray6 = drizzleSummer2;
          } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 200 && conditionID6 <= 232)) {
            outfitImg6.src = randomArrayValue(rainSummer2);
            imgArray6 = drizzleSummer2;
          } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 500 && conditionID6 <= 531)) {
            outfitImg6.src = randomArrayValue(rainSummer2);
            imgArray6 = rainSummer2;
          } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 === 701 || conditionID6 === 741)) {
            outfitImg6.src = randomArrayValue(drizzleSummer2);
            imgArray6 = drizzleSummer2;
          } else if ((temp6hr >= 28 && temp6hr < 35) && (conditionID6 >= 801 && conditionID6 <= 804)) {
            outfitImg6.src = randomArrayValue(overcastSummer2);
            imgArray6 = overcastSummer2;
          }

          //death 35º+
          else if (temp6hr >= 35 && conditionID6 === 800) {
            outfitImg6.src = randomArrayValue(clearDeath);
            imgArray6 = clearDeath;
          } else if (temp6hr >= 35 && (conditionID6 >= 300 && conditionID6 <= 321)) {
            outfitImg6.src = randomArrayValue(drizzleDeath);
            imgArray6 = drizzleDeath;
          } else if (temp6hr >= 35 && (conditionID6 >= 200 && conditionID6 <= 232)) {
            outfitImg6.src = randomArrayValue(rainDeath);
            imgArray6 = rainDeath;
          } else if (temp6hr >= 35 && (conditionID6 >= 500 && conditionID6 <= 531)) {
            outfitImg6.src = randomArrayValue(rainDeath);
            imgArray6 = rainDeath;
          } else if (temp6hr >= 35 && (conditionID6 === 701 || conditionID6 === 741)) {
            outfitImg6.src = randomArrayValue(drizzleDeath);
            imgArray6 = drizzleDeath;
          } else if (temp6hr >= 35 && (conditionID6 >= 801 && conditionID6 <= 804)) {
            outfitImg6.src = randomArrayValue(overcastDeath);
            imgArray6 = overcastDeath;
          }
      }
      loadOutfits6();

      function loadOutfits12() {
        //spring/Fall 10º - 16º
        if (temp12hr >= 10 && temp12hr < 17 && conditionID12 === 800) {
          outfitImg12.src = randomArrayValue(clearSpringFall);
          imgArray12 = clearSpringFall;
        } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 300 && conditionID12 <= 321)) {
          outfitImg12.src = randomArrayValue(drizzleSpringFall);
          imgArray12 = drizzleSpringFall;
        } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 200 && conditionID12 <= 232)) {
          outfitImg12.src = randomArrayValue(rainSpringFall);
          imgArray12 = rainSpringFall;
        } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 500 && conditionID12 <= 531)) {
          outfitImg12.src = randomArrayValue(rainSpringFall);
          imgArray12 = rainSpringFall;
        } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 === 701 || conditionID12 === 741)) {
          outfitImg12.src = randomArrayValue(drizzleSpringFall);
          imgArray12 = drizzleSpringFall;
        } else if ((temp12hr >= 10 && temp12hr < 17) && (conditionID12 >= 801 && conditionID12 <= 804)) {
          outfitImg12.src = randomArrayValue(overcastSpringFall);
          imgArray12 = overcastSpringFall;
        } 
        
        //summer1 17º - 27º
        else if (temp12hr >= 17 && temp12hr < 28 && conditionID12 === 800) {
          outfitImg12.src = randomArrayValue(clearSummer1);
          imgArray12 = clearSummer1;
        } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 300 && conditionID12 <= 321)) {
          outfitImg12.src = randomArrayValue(drizzleSummer1);
          imgArray12 = drizzleSummer1;
        } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 200 && conditionID12 <= 232)) {
          outfitImg12.src = randomArrayValue(rainSummer1);
          imgArray12 = rainSummer1;
        } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 500 && conditionID12 <= 531)) {
          outfitImg12.src = randomArrayValue(rainSummer1);
          imgArray12 = rainSummer1;
        } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 === 701 || conditionID12 === 741)) {
          outfitImg12.src = randomArrayValue(drizzleSummer1);
          imgArray12 = drizzleSummer1;
        } else if ((temp12hr >= 17 && temp12hr < 28) && (conditionID12 >= 801 && conditionID12 <= 804)) {
          outfitImg12.src = randomArrayValue(overcastSummer1);
          imgArray12 = overcastSummer1;
        }

        //summer2 28º - 34º
        else if (temp12hr >= 28 && temp12hr < 35 && conditionID12 === 800) {
          outfitImg12.src = randomArrayValue(clearSummer2);
          imgArray12 = clearSummer2;
        } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 300 && conditionID12 <= 321)) {
          outfitImg12.src = randomArrayValue(drizzleSummer2);
          imgArray12 = drizzleSummer2;
        } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 200 && conditionID12 <= 232)) {
          outfitImg12.src = randomArrayValue(rainSummer2);
          imgArray12 = rainSummer2;
        } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 500 && conditionID12 <= 531)) {
          outfitImg12.src = randomArrayValue(rainSummer2);
          imgArray12 = rainSummer2;
        } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 === 701 || conditionID12 === 741)) {
          outfitImg12.src = randomArrayValue(drizzleSummer2);
          imgArray12 = drizzleSummer2;
        } else if ((temp12hr >= 28 && temp12hr < 35) && (conditionID12 >= 801 && conditionID12 <= 804)) {
          outfitImg12.src = randomArrayValue(overcastSummer2);
          imgArray12 = overcastSummer2;
        }

        //death 35º+
        else if (temp12hr >= 35 && conditionID12 === 800) {
          outfitImg12.src = randomArrayValue(clearDeath);
          imgArray12 = clearDeath;
        } else if (temp12hr >= 35 && (conditionID12 >= 300 && conditionID12 <= 321)) {
          outfitImg12.src = randomArrayValue(drizzleDeath);
          imgArray12 = drizzleDeath;
        } else if (temp12hr >= 35 && (conditionID12 >= 200 && conditionID12 <= 232)) {
          outfitImg12.src = randomArrayValue(rainDeath);
          imgArray12 = rainDeath;
        } else if (temp12hr >= 35 && (conditionID12 >= 500 && conditionID12 <= 531)) {
          outfitImg12.src = randomArrayValue(rainDeath);
          imgArray12 = rainDeath;
        } else if (temp12hr >= 35 && (conditionID12 === 701 || conditionID12 === 741)) {
          outfitImg12.src = randomArrayValue(drizzleDeath);
          imgArray12 = drizzleDeath;
        } else if (temp12hr >= 35 && (conditionID12 >= 801 && conditionID12 <= 804)) {
          outfitImg12.src = randomArrayValue(overcastDeath);
          imgArray12 = overcastDeath;
        }
      }
      loadOutfits12();
    })
    enableShuffleBtn();
  });

    
}



