var city="Philadelphia";
	var APIKey="6d6f7899a40648fa2d6b5e6e1ddc218f"
	var queryURL ="http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+APIKey;
	$.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          console.log(response.main.temp);
          $("#weatherTemp").html("<p>City name:"+response.main.temp+"°F </p>")
		  var weather = response.weather[0].description ;
    console.log(weather);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        "sunny" + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          var results = response.data;
          // storing the data from the AJAX request in the results variable
          var weatherImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          weatherImage.attr("src", results[0].images.fixed_height_small.url);
          $("#imageHolder").html(weatherImage)
        });
       

	  }); 