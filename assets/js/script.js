


var date = moment().format('M/DD/YYYY');
var apiKey = '1371c97168ddd23b4146579d8cbe687b';
var weatherUrlBase;
var apiURL;
var forecastDays = 5;
var cityName;

var weatherInfo;
var parsedIcon;
var parsedCityDate;
var parsedLat;
var parsedLon;
var parsedCountry;
var parsedTempNow;
var parsedHumidNow;
var parsedWindNow;

var forecastInfo;
var cityNameForURL;
var weatherAPIURL;



//SET GLOBAL VARIABLES ABOVE
//---------------------------------------------------------------------------------------------------------------
//DEFINE UTILITY FUNCTIONS BELOW


//Get storage
function retrieveStoredArray(storedDataName) {
    const forceArray = (v) => [].concat(v).map(name => name);
    var storedArray = forceArray(JSON.parse(localStorage.getItem(storedDataName)));
    return storedArray;
}

//Set storage
function storeArray(assignName, data) {
    const forceArray = (v) => [].concat(v).map(name => name);
    var sendToStorage = JSON.stringify(forceArray(data));
    localStorage.setItem(assignName, sendToStorage);
    return console.log('Stored ' + assignName + ' as: ' + sendToStorage)
}


//DEFINE UTILITY FUNCTIONS ABOVE
//------------------------------------------------------------------------------------------------------------------
//DEFINE THE PRIMARY FUNCTION BELOW



function constructPage() {
    //create overall container
    $('header').addClass('text-center bg-dark text-light');
    var container = $('.container').addClass('d-flex');
    //left container
    var leftContainerCol = $('<div>').addClass('parameters col bg-secondary bg-opacity-10').attr('id', 'left-cont');
    //right container
    var rightContainerCol = $('<div>').addClass('results col-8 m-3').attr('id', 'right-cont');
    //top left container
    var citySearchCont = $('<div>').addClass('row').attr('id', 'search-cont');
    var citySearchHeader = $('<h2>').addClass('row w-100 m-1').attr('id', 'search-header').text('Search for a City:');
    var cityTextBtnCont = $('<div>').addClass('row w-100 m-1').attr('id', 'search-text-btn-cont');
    var citySearchInput = $('<input>').addClass('col border border-secondary rounded').attr('id', 'search-input').val('San Diego');
    var citySearchButton = $('<button>').addClass('col-2 m-2 pt-2 pb-2 bg-primary border border-3 border-info rounded').attr('id', 'search-button');

    var cities;
    var listOfCitiesContainer = $('<div>').addClass('row border border-secondary rounded city-info').attr('id', 'city-info-cont');
    for (let i = 0; i < 8; i++) {
        cities = $('<div>').addClass('row w-100 m-0 p-2 border border-light').attr('id', 'city' + i);
        listOfCitiesContainer.append(cities);
    }
    //top right container
    var selectedCityContainer = $('<div>').addClass('row w-100 border border-secondary rounded city-info').attr('id', 'city-info-container');
    var cityNameDate = $('<div>').addClass('row w-100 m-1').attr('id', 'city-name-date');
    selectedCityContainer.append(cityNameDate);
    //fill the selected city section
    var cityInfo;
    var cityInfoIDs = ['temp', 'humid', 'wind', 'uv'];
    for (let i = 0; i < cityInfoIDs.length; i++) {
        cityInfo = $('<div>').addClass('row w-100 m-1').attr('id', 'city-' + cityInfoIDs[i]);
        selectedCityContainer.append(cityInfo);
    }
    //bottom right container
    var forecastContainer = $('<div>').addClass('row').attr('id', 'forecast-container');
    //fill the forecast container
    var forecastTop = $('<div>').addClass('row w-100 m-1 p-1 forecast-title-container');
    var forecastTopTitle = $('<h2>').addClass('forecast-title').text('5-Day Forecast');
    //build out the forecast divs
    var forecastBot = $('<div>').addClass('row w-100 m-1 p-1 d-flex forecast-blocks-container');
    var forecastIDs = ['date', 'icon', 'temp', 'humid'];
    var dayContainer;
    for (let i = 0; i < forecastDays; i++) {
        dayContainer = $('<div>').addClass('col bg-primary m-1 rounded forecast-blocks').attr('id', 'day-cont' + i);
        for (let j = 0; j < forecastIDs.length; j++) {
            var info = $('<div>').addClass(' m-1 text-light margin-left-0 margin-right-auto forecast').attr('id', (forecastIDs[j] + i));
            dayContainer.append(info);
        }
        forecastBot.append(dayContainer);
    }
    //append remaining relationships between objects
    container.append(
        leftContainerCol.append(
            citySearchCont.append(
                citySearchHeader, cityTextBtnCont.append(
                    citySearchInput, citySearchButton)),
            listOfCitiesContainer),
        rightContainerCol.append(
            selectedCityContainer.append(
                $('<br>'),$('<br>'),$('<br>'),$('<br>')),
            forecastContainer.append(
                forecastTop.append(
                    forecastTopTitle), forecastBot)));

//Handle adding the icons
                    $('#search-button').append($('<img id="search-button-icon" src="https://vectorified.com/images/white-search-icon-png-33.png" height="16" width="16"/>'));
                    $('#city-name-date::after').append($('<img id="city-name-date-icon src="./assets/images/image1.jpg" height="32" width="32"/>'));
                    $('#icon0').append($('<img id="icon-img0" src="./assets/images/image1.jpg" height="32" width="32"/>'));
                    $('#icon1').append($('<img id="icon-img1" src="./assets/images/image1.jpg" height="32" width="32"/>'));
                    $('#icon2').append($('<img id="icon-img2" src="./assets/images/image1.jpg" height="32" width="32"/>'));
                    $('#icon3').append($('<img id="icon-img3" src="./assets/images/image1.jpg" height="32" width="32"/>'));
                    $('#icon4').append($('<img id="icon-img4" src="./assets/images/image1.jpg" height="32" width="32"/>'));
//Load local storage of past cities
    for (var i = 0; i < 8; i++) {
        $('#city' + i).text(retrieveStoredArray('city-history-' + i));
    }
    $('#search-input').val('San Diego');
    cityName = $('#search-input').val();
    cityNameForURL = encodeURIComponent(cityName.trim());
    weatherAPIURL = ('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameForURL + '&units=imperial&appid=' + apiKey);
    getWeather(weatherAPIURL);
}

function getWeather(URL) {
    fetch(URL, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityNameForURL = encodeURIComponent(cityName.trim());
            weatherInfo = data;
            parsedIcon = 'http://openweathermap.org/img/wn/' + data.weather['0'].icon + '@2x.png';

            $('#city-name-date').text(cityName + ' (' + date + ') ');
            // $('#city-name-date-icon').attr('src', ('http://openweathermap.org/img/wn/' + data.weather['0'].icon + '@2x.png'));
            $('#city-temp').text('Temperature: ' + data.main.temp);
            $('#city-humid').text('Humidity: ' + data.main.humidity);
            $('#city-wind').text('Wind Speed: ' + data.wind.speed + ' MPH');

            forecastAPIURL = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial' + '&appid=' + apiKey);
            getForecast(forecastAPIURL);
        });
}

function getForecast(URL) {
    fetch(URL, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#city-uv').text('UVI: ');
            $('#city-uv').append($('<div>').attr('id', 'uvi-cont').text(data.daily['0'].uvi));
            $('#date0').text(moment.unix(data.daily['1'].dt).format('M/DD/YYYY'));
            $('#icon-img0').attr('src', 'http://openweathermap.org/img/wn/' + data.daily['1'].weather['0'].icon + '@2x.png');
            $('#temp0').text('Temp: ' + data.daily['1'].temp.day + '°F');
            $('#humid0').text('Humidity: ' + data.daily['1'].humidity + '%');
            $('#date1').text(moment.unix(data.daily['2'].dt).format('M/DD/YYYY'));
            $('#icon-img1').attr('src', 'http://openweathermap.org/img/wn/' + data.daily['2'].weather['0'].icon + '@2x.png');
            $('#temp1').text('Temp: ' + data.daily['2'].temp.day + '°F');
            $('#humid1').text('Humidity: ' + data.daily['2'].humidity + '%');
            $('#date2').text(moment.unix(data.daily['3'].dt).format('M/DD/YYYY'));
            $('#icon-img2').attr('src', 'http://openweathermap.org/img/wn/' + data.daily['3'].weather['0'].icon + '@2x.png');
            $('#temp2').text('Temp: ' + data.daily['3'].temp.day + '°F');
            $('#humid2').text('Humidity: ' + data.daily['3'].humidity + '%');
            $('#date3').text(moment.unix(data.daily['4'].dt).format('M/DD/YYYY'));
            $('#icon-img3').attr('src', 'http://openweathermap.org/img/wn/' + data.daily['4'].weather['0'].icon + '@2x.png');
            $('#temp3').text('Temp: ' + data.daily['4'].temp.day + '°F');
            $('#humid3').text('Humidity: ' + data.daily['4'].humidity + '%');
            $('#date4').text(moment.unix(data.daily['5'].dt).format('M/DD/YYYY'));
            $('#icon-img4').attr('src', 'http://openweathermap.org/img/wn/' + data.daily['5'].weather['0'].icon + '@2x.png');
            $('#temp4').text('Temp: ' + data.daily['5'].temp.day + '°F');
            $('#humid4').text('Humidity: ' + data.daily['5'].humidity + '%');

        });
}


//DEFINE THE PRIMARY FUNCTION ABOVE
//------------------------------------------------------------------------------------------------------------------
//LISTEN AND TAKE ACTION BELOW


constructPage();

document.querySelector('button').addEventListener('click', function (event) {
    var inputEl = $(event.target);
    cityName = $('#search-input').val();
    cityNameForURL = encodeURIComponent(inputEl.parent().children(0).val().trim());
    weatherAPIURL = ('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameForURL + '&units=imperial&appid=' + apiKey);
    getWeather(weatherAPIURL);

    for (var i = 8; i > 0; i--) {
        storeArray(('city-history-' + i), $('#city' + (i - 1)).text());
    }
    storeArray('city-history-0', $('#search-input').val());

    for (var i = 0; i < 8; i++) {
        $(('#city' + i)).text(retrieveStoredArray(('city-history-' + i)));
    }

});

document.addEventListener('keyup', function (event) {
    var inputEl = $(event.key);
    console.log(inputEl);
    if (inputEl === "Enter") {
    cityName = $('#search-input').val();
    cityNameForURL = encodeURIComponent($('#search-input').val().trim());
    weatherAPIURL = ('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameForURL + '&units=imperial&appid=' + apiKey);
    getWeather(weatherAPIURL);
    for (var i = 8; i > 1; i--) {
        storeArray(('city-history-' + i), $('#city' + (i - 1)).text());
    }
    storeArray('city-history-0', $('#search-input').val());
    for (var i = 0; i < 8; i++) {
        $(('#city' + i)).text(retrieveStoredArray(('city-history-' + i)));
    }

    }
});


//LISTEN AND TAKE ACTION ABOVE
//------------------------------------------------------------------------------------------------------------------
//NOTES BELOW HERE


// Javascript
//     SELECT BY ID
//         document.querySelector('#someIDHere');
//     SELECT BY CLASS
//         document.querySelector('.someClassHere');
//     SELECT CHILDREN OF
//         document.querySelector('someSelectorHere).children[0].children[0];
//     CREATE DOM ELEMENT
//         document.createElement("someTagHere");
//     ASSIGN A CONTAINER ELEMENT
//         document.querySelector("someSelectorHere");
//     ADD ATTRIBUTE (CLASS)
//         document.querySelector("someSelectorHere").setAttribute('.someClassHere');
//     ADD TEXT
//         document.querySelector("someSelectorHere").setAttribute('.someClassHere').textContent;
//     RANDOM CONSOLIDATED EXAMPLE
//         document.querySelector("someSelectorHere").setAttribute('.someClassHere').textContent = 'some text';
//     EVENT LISTENERS
//         document.querySelector("someSelectorHere").addEventListener('click', function () {
//             function goes here
//         })


// jQuery
//     SELECT BY ID
//         $('#someIDhere');
//     SELECT BY CLASS
//         $('.someClassHere');
//     SELECT CHILDREN OF
//         $('.someClassHere').child(0).child(0);
//     CREATE DOM ELEMENT
//         $('<someTagHere>');
//     ASSIGN A CONTAINER ELEMENT
//         $('someSelectorHere');
//     ADD ATTRIBUTE (CLASS)
//         $('someSelectorHere').addClass('someClassAssignmentHere');
//     ADD TEXT
//         $('someSelectorHere').addClass('someClassAssignmentHere').text('someTextHere');
//     RANDOM CONSOLIDATED EXAMPLE
//         $('<td>').addClass('p-2').text(type);