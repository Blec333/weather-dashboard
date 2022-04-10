
moment.unix('1649617200').format('M/DD/YYYY');

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


var cityNameForURL = encodeURIComponent('San Diego'.trim());
var weatherAPIURL = ('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameForURL + '&units=imperial&appid=' + apiKey);



//SET GLOBAL VARIABLES ABOVE
//---------------------------------------------------------------------------------------------------------------
//DEFINE UTILITY FUNCTIONS BELOW


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

            weatherInfo = data;
            parsedIcon = weatherInfo.weather['0'].icon;
            parsedCityDate = cityName + ' (' + date + ') ';
            parsedLat = weatherInfo.coord.lat;
            parsedLon = weatherInfo.coord.lon;
            parsedCountry = weatherInfo.sys.country;
            parsedTempNow = weatherInfo.main.temp;
            parsedHumidNow = weatherInfo.main.humidity;
            parsedWindNow = weatherInfo.wind.speed + ' MPH';

            forecastAPIURL = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + parsedLat + '&lon=' + parsedLon + '&appid=' + apiKey);
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
            forecastInfo = data;
            var parsedUVNow;


    $('#city-name-date').text($('#search-input').val() + ' ' + date + ' ' + parsedIcon);
    $('#city-temp').text('Temperature: ' + parsedTempNow);
    $('#city-humid').text('Humidity: ' + parsedHumidNow);
    $('#city-wind').text('Wind Speed: ' + );
    $('#city-uv').text();


            $('#date0').text();
            $('#icon0').text();
            $('#temp0').text();
            $('#humid0').text();


            $('#date1').text();
            $('#icon1').text();
            $('#temp1').text();
            $('#humid1').text();


            $('#date2').text();
            $('#icon2').text();
            $('#temp2').text();
            $('#humid2').text();


            $('#date3').text();
            $('#icon3').text();
            $('#temp3').text();
            $('#humid3').text();


            $('#date4').text();
            $('#icon4').text();
            $('#temp4').text();
            $('#humid4').text();



    $('#search-input').val('');
    $('#city1').text('test');
    $('#city2').text('test');
    $('#city3').text('test');
    $('#city4').text('test');
    $('#city5').text('test');
    $('#city6').text('test');
    $('#city7').text('test');
    $('#city8').text('test');







        });
}

function updateStoredArray(storedDataName, addData) {
    const forceArray = (v) => [].concat(v).map(name => name);
    var storedArray = JSON.parse(localStorage.getItem(storedDataName));
    if (typeof storedArray === 'string' && storedArray.length > 0) {
        storedArray = forceArray(JSON.parse(localStorage.getItem(storedDataName)));
        var combinedArray = storedArray.push(addData);
        var backToStorage = JSON.stringify(combinedArray);
    } else if (typeof storedArray === 'object') {
        var combinedArray = storedArray.push(addData);
        var backToStorage = JSON.stringify(combinedArray);
    } else {
        var backToStorage = JSON.stringify(forceArray(addData));
    }
    localStorage.setItem(storedDataName, backToStorage);
    return console.log('Stored ' + storedDataName + ' as: ' + backToStorage)
}



//DEFINE UTILITY FUNCTIONS ABOVE
//------------------------------------------------------------------------------------------------------------------
//DEFINE THE PRIMARY FUNCTION BELOW



function constructPage() {
    //create overall container
    $('header').addClass('text-center bg-dark text-light');
    var container = $('.container').addClass('w-100 d-flex');
    //left container
    var leftContainerCol = $('<div>').addClass('parameters col bg-light').attr('id', 'left-cont');
    //right container
    var rightContainerCol = $('<div>').addClass('results col-9').attr('id', 'right-cont');
    //top left container
    var citySearchCont = $('<div>').addClass('row').attr('id', 'search-cont');
    var citySearchHeader = $('<h2>').addClass('row w-100 m-1').attr('id', 'search-header').text('Search for a City:');
    var cityTextBtnCont = $('<div>').addClass('row w-100 m-1').attr('id', 'search-text-btn-cont');
    var citySearchInput = $('<input>').addClass('col border border-secondary rounded').attr('id', 'search-input').val('San Diego');
    var citySearchButton = $('<button>').addClass('col-2 m-1 p-0 bg-primary border border-secondary rounded').attr('id', 'search-button');
    var citySearchIcon = $('<svg>').addClass('bi bi-search').attr({ 'id': 'icon', 'xmlns': 'http://www.w3.org/2000/svg', 'width': '8', 'height': '8', 'fill': 'currentColor', 'viewBox': '0 0 8 8' });
    var citySearchIconPath = $('<path>').attr('d', 'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z');
    citySearchButton.append(citySearchIcon.append(citySearchIconPath));
    //bottom left container
    var cities;
    var listOfCitiesContainer = $('<div>').addClass('row border border-secondary rounded city-info').attr('id', 'city-info-cont');
    for (let i = 0; i < 8; i++) {
        cities = $('<div>').addClass('row w-100 p-3 border border-secondary rounded').attr('id', 'city' + i).text('test');
        listOfCitiesContainer.append(cities);
    }
    //top right container
    var selectedCityContainer = $('<div>').addClass('row w-100 border border-secondary rounded city-info').attr('id', 'city-info-container');
    //fill the selected city section
    var cityInfo;
    var cityInfoIDs = ['name-date', 'temp', 'humid', 'wind', 'uv'];
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
        dayContainer = $('<div>').addClass('col bg-primary m-2 rounded forecast-blocks').attr('id', 'day-cont' + i);
        for (let j = 0; j < forecastIDs.length; j++) {
            var info = $('<p>').addClass('row w-100 m-1 text-light forecast-dates').attr('id', (forecastIDs[j] + j));
            dayContainer.append(info);
        }
        forecastBot.append(dayContainer);
    }

    //append remaining relationships between objects
    container.append(
        leftContainerCol.append(
            citySearchCont.append(
                citySearchHeader, cityTextBtnCont.append(
                    citySearchInput, citySearchButton.append(
                        citySearchIcon.append(
                            citySearchIconPath)))),
            listOfCitiesContainer),
        rightContainerCol.append(
            selectedCityContainer.append(
                $('<br>')),
            forecastContainer.append(
                forecastTop.append(
                    forecastTopTitle), forecastBot)));


}



//DEFINE THE PRIMARY FUNCTION ABOVE
//------------------------------------------------------------------------------------------------------------------
//LISTEN AND TAKE ACTION BELOW



constructPage();

document.querySelector('button').addEventListener('click', function (event) {
    var inputEl = $(event.target);
    var cityNameForURL = encodeURIComponent(inputEl.parent().children(0).val().trim());

    getWeather(weatherAPIURL);

    //updateStoredArray(CIT1, targetedText);
});





//LISTEN AND TAKE ACTION ABOVE
//------------------------------------------------------------------------------------------------------------------











//------------------------------------------------------------------------------------------------------------------
//NOTES BELOW HERE
//------------------------------------------------------------------------------------------------------------------



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


















// TO BE ORGANIZED LATER



//   // You can also chain methods onto new lines to keep code clean
//   var totalTdEl = $('<td>').addClass('p-2').text('$' + totalEarnings);

//   var deleteProjectBtn = $('<td>')
//     .addClass('p-2 delete-project-btn text-center')
//     .text('X');

//   // By listing each `<td>` variable as an argument, each one will be appended in that order
//   projectRowEl.append(
//     projectNameTdEl,
//     projectTypeTdEl,
//     rateTdEl,
//     dueDateTdEl,
//     daysLeftTdEl,
//     totalTdEl,
//     deleteProjectBtn
//   );

//   projectDisplayEl.append(projectRowEl);
//   //modal (hide)
//   projectModalEl.modal('hide');
// }

// function calculateTotalEarnings(rate, days) {
//   var dailyTotal = rate * 8;
//   var total = dailyTotal * days;
//   return total;
// }

// function handleDeleteProject(event) {
//   console.log(event.target);
//   var btnClicked = $(event.target);
//   btnClicked.parent('tr').remove();
// }

// // handle project form submission
// function handleProjectFormSubmit(event) {
//   event.preventDefault();

//   var projectName = projectNameInputEl.val().trim();
//   var projectType = projectTypeInputEl.val().trim();
//   var hourlyRate = hourlyRateInputEl.val().trim();
//   var dueDate = dueDateInputEl.val().trim();

//   printProjectData(projectName, projectType, hourlyRate, dueDate);

//   projectFormEl[0].reset();
// }

// projectFormEl.on('submit', handleProjectFormSubmit);
// projectDisplayEl.on('click', '.delete-project-btn', handleDeleteProject);
// dueDateInputEl.datepicker({ minDate: 1 });

// setInterval(displayTime, 1000);
