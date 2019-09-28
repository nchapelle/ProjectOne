$(document).ready(function() {
  var btns = [];

  //api call to gif's
  $(document).on("click", ".tv-btn", function() {
    $("#show-group").empty();
    $(".result").removeClass("active");
    $(this).addClass("active");

    var any = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      any +
      "&api_key=0DFbYPoL3Baw4PRlHmIqhxNJaIILMRD5&limit=10" +
      any;

    // ajax get request
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //  after data comes back from api
      .then(function(response) {
        //  storing results in results variable
        console.log(response);
        console.log(queryURL);
        var results = response.data;
        var container = $("<div class='button-item'>");

        // looping over results area
        for (var i = 0; i < results.length; i++) {
          // console.log(results);
          var resultsDiv = $("<div class= 'button-result'>");
          // var p = $("<p>").text("Rating: " + rating);
          var showImg = $("<img class='result'>");
          showImg.attr("src", results[i].images.fixed_height_small.url);
          showImg.attr("data-state", "animated");
          // showImg.attr("data-animated", results[i].images.fixed_width_small.url);
          // showImg.attr("data-still", results[i].images.fixed_width_still.url);
          // console.log(showImg);
          resultsDiv.prepend(showImg);
          container.prepend(resultsDiv);
          //   shows the api limit results. has to be within function to work
          resultsDiv.appendTo($("#show-group"));
        }
        // console.log(resultsDiv);
      });
  });
  //on click event for aminate and still for images
  $(document).on("click", ".result", function() {
    var state = $(this).attr("data-state");
    if (state === "animated") {
      // put the src of the new still image
      $(this).attr("src", $(this).attr("data-still"));
      // change the state to still
      $(this).attr("data-state", "still");
    } else {
      // put the src of the new animated image
      $(this).attr("src", $(this).attr("data-animated"));
      // change the state to animated
      $(this).attr("data-state", "animated");
    }
  });
  // could wrap in a function to call
  //loops through array of tv-shows
  for (var i = 0; i < btns.length; i++) {
    var button = $("<button>").text(btns[i]); // shows text on the button
    //   console.log(button);
    button.attr("data-name", btns[i]);
    button.addClass("tv-btn"); //class added
    $("#button-view").append(button); //adds button to html
  }
  // This function handles events where a show button is clicked
  $("#new-btn").on("click", function(event) {
    event.preventDefault();
    var existentButtons = false;
    if (btns.indexOf($("#new-btn").val()) !== -1) {
      existentButtons = true;
    }
    //adding new show to new button
    if ($("#add-btn").val() !== "" && existentButtons === false) {
      var btn = $("#add-btn").val();
      btns.push(btn);
      var button = $("<button>").text(btn);
      button.attr("data-name", btn);
      button.addClass("tv-btn");
      $("#button-view").append(button);
    }
    $("#add-btn").val("");
  });
});
