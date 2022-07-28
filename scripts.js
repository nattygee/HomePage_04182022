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

// getting date and time

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

var dayReading = new Date();

var dayOfWeek = days[dayReading.getDay()];
var monthOfYear = months[dayReading.getMonth()];
var dayOfMonth = dayReading.getDate();

document.getElementById("dateReading").innerHTML = dayOfWeek + " " + monthOfYear + ", " + dayOfMonth;

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

// searching for users location after they hit the little location button
document.getElementById('locationBtn').addEventListener('click', testForLocation);

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
  var citySearchInput = document.getElementById('cityInput');
  var autoCompleteVar = new google.maps.places.Autocomplete(citySearchInput);
}

