// variables 
let city = document.querySelector('#city');
let input = document.querySelector('.search');
let form = document.querySelector('form');
let theDay = document.querySelector('.day');
let hour = document.querySelector('.hour');
let temp = document.querySelector('#temprature');
let F = document.querySelector('#farenhiet');
let C = document.querySelector('#celsius');
let currentDate = new Date();
let humditiy = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let current = document.querySelector('.current-data');



//evenlisteners
evenlisteners()
function evenlisteners() {

  // submit the form
  form.addEventListener('submit', changeInfo);

  // get the current data
  current.addEventListener('click', showPosition);
 
  // convert celicous to Fahrenheit
  F.addEventListener('click', changeCtoF);

  // convert Fahrenheit to celicous
  C.addEventListener('click', changeFtoC);

}


// change location
function changeInfo(event) {
  event.preventDefault();
  // get city value input
  city.innerHTML = input.value;
  let location = city.innerHTML;

  // api key
  let key = "9d49cb1787297e12afd385e4fcc226c8";

  // api url
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;

  // axios request
  axios.get(url).then(getDetials);

}


// get datials by get request
function getDetials(response){

  // get city name
  city.innerHTML = response.data.name;

  // get temprature
  temp.innerHTML =  Math.round(response.data.main.temp);

  // get humditiy
  humditiy.innerHTML = `Humidity: ${response.data.main.humidity}%`

  // get wind
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`
  
}



// get date
function getCurrentDate(latestDate){
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  let day = days[latestDate.getDay()];
  let month = months[latestDate.getMonth()];
  let year = latestDate.getFullYear();
  let hours = latestDate.getHours();

  if(hours < 10){
    hours = `0${hours}`
  }

  let minutes = latestDate.getMinutes();
  if(minutes < 10){
    minutes = `0${minutes}`
  }

  theDay.innerHTML =  ` ${month}, ${day} `;
  hour.innerHTML = `${hours}: ${minutes}`;
}
getCurrentDate(currentDate)



// convert celicous to Fahrenheit
function changeCtoF(){
  temp.innerHTML = 50;
}



// convert Fahrenheit to celicous 
function changeFtoC(){
  temp.innerHTML = 7
}



// search the current city by geolocation
function searchCity(city) {
  let key = "9d49cb1787297e12afd385e4fcc226c8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(getDetials);
}

// search location by navigator
function searchLocation(position){
  let key = "9d49cb1787297e12afd385e4fcc226c8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(getDetials);
}



// get the current temp and the city
function showPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
}

searchCity("Iran");
