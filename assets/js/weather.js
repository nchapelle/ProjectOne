function callWeatherAPI(cityName) {
  var city = cityName;
  console.log(city);
  var APIKey = "6d6f7899a40648fa2d6b5e6e1ddc218f";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.main.temp);
    $("#weatherTemp").html("<p>" + city + " " + response.main.temp + "°F </p>");
    var weather = response.weather[0].main;
    console.log(weather);
    console.log(response);
    var a = response.dt - response.timezone;
    var myDate = Date(a);
    console.log(myDate);
    // document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
    $("#time").html("<div> Current time is: " + myDate + "</div>");
    var iconURL =
      "http://openweathermap.org/img/wn/" +
      response.weather[0].icon +
      "@2x.png";
    console.log(iconURL);
    var weatherBox = $("<div>");
    weatherBox.addClass("text-center");
    var icon = $("<img>");
    icon.attr("src", iconURL);

    $("#imageHolder").html(icon);
    $(icon).append(weatherBox);

    //       "https://api.giphy.com/v1/gifs/search?q=" +
    //       weather +
    //       "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";

    //     // Performing an AJAX request with the queryURL
    //     $.ajax({
    //       url: queryURL,
    //       method: "GET"
    //     })
    //       // After data comes back from the request
    //       .then(function(response) {
    //         console.log(queryURL);

    //         console.log(response);
    //         var results = response.data;
    //         // storing the data from the AJAX request in the results variable

    //         // Setting the src attribute of the image to a property pulled off the result item
    //       });
  });
}
