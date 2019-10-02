const gametime = 100;
var highscore = 15;
var danger = 0;
var countdown = 15;
var roundScore = 0;
var intervalId;
var threat = 1;
var modeTime = 0;
var timeLost = 0;

//on load
var time = {
  run: function() {
    clearInterval(intervalId);
    intervalId = setInterval(time.decrement, 1000 * threat);
  },
  stop: function() {
    clearInterval(intervalId);
  },
  decrement: function() {
    countdown--;
    timeLost++;
    var dataval = parseInt($(".progress").attr("data-amount"));
    if (dataval < 100) {
      $(".progress .amount").css("width", 100 - dataval + "%");
    }

    threatMeter(1, timeLost);
    // $(".timer").html("<h2>" + countdown + "</h2>");
    // $(".timer").hide()
    if (countdown === 0) {
      time.stop();
      var dragonGO = $("<img>");
      dragonGO.attr("src", dragon.images[1]);
      dragonGO.attr("id", "game-over");
      // $("#dragon").empty();
      $(".lootBox").empty();
      time.stop();
      roundScore = 0;
      danger = 0;
      timeLost = 0;
      $(".dragonBox").append(dragonGO);
      $("#game-over").on("click", function() {
        // $("#dragon").empty();
        $(".dragonBox").empty();
        // choices.startGame();
        // makeCanvas();
        $("#detachMe").appendTo(".jumbotron");
      });
    }
  }
};

var weatherStart = function() {
  console.log(weatherTemp);

  if (weatherTemp <= 65) {
    modeTime = 60;
    threat = 1.25;
    console.log("Threat Modifier: " + threat);
    choices.lootStart();
  } else if (weatherTemp > 65 || weatherTemp < 80) {
    modeTime = 60;
    threat = 1;
    console.log("Threat Modifier: " + threat);
    choices.lootStart();
  } else {
    modeTime = 60;
    threat = 0.75;
    console.log("Threat Modifier: " + threat);
    choices.lootStart();
  }
};
var dragon = {
  images: ["assets/img/dragonKnows.gif", "assets/img/gameOver.gif"],

  knows: function() {
    var dragonImg = $("<img>");
    dragonImg.addClass("col");
    dragonImg.attr("src", dragon.images[0]);
    dragonImg.attr("id", "heKnows");
    $(".dragonBox").append(dragonImg);
    $("#heKnows").on("click", function() {
      $(".dragonBox").empty();
      treasurePile.lootPiles();
    });
  },

  checkRound: function() {
    if (roundScore >= 1) {
      time.stop();
      // $("#dragon").empty();
      dragon.knows();
      danger++;
      console.log("Round Score: " + roundScore);
      console.log("Danger: " + danger);
      // countdown = 15 - danger;
      // $(".timer").html("<h2> checkround: " + countdown + "</h2>"); //to let us know what timer is being called
      time.run();
    }
  }
};

var choices = {
  goHome: function() {
    var goHome = $("<div>");
    goHome.addClass("frank text-center");
    goHome.attr("data-value", "0");
    goHome.attr("id", "cardBG");
    var goHomeImg = $("<img>");
    goHomeImg.attr("src", "./assets/img/cave_entranceCA.jpg");
    goHomeImg.attr("id", "no-game");
    goHomeImg.attr("data-value", "0");
    $(goHome).append(goHomeImg);
    goHome.appendTo(".gameStart");
    $("#no-game").on("click", function() {
      delayButtonAlert = setTimeout(function() {
        alert("You have wasted your opportunity.");
        // $(".jumbotron").empty(); why are we emptying here make image a modal?
        // choices.startGame();
      }, 1000);
    });
  },

  lootStart: function() {
    var lootStart = $("<div>");
    lootStart.addClass("frank text-center");
    lootStart.attr("data-value", "1");
    lootStart.attr("id", "cardBG");
    var lootStartImg = $("<img>");
    lootStartImg.attr("src", "./assets/img/golden_entry.jpg");
    lootStartImg.attr("id", "Go-Time");
    lootStartImg.attr("data-value", "1");
    $(lootStart).append(lootStartImg);
    lootStart.appendTo(".gameStart");
    $("#Go-Time").on("click", function() {
      $(".frank").empty();
      console.log("Correct Choice, game start!");
      treasurePile.lootPiles();
      $("#modal-button").hide();
      time.run();
      time.decrement();
      // $(".timer").html("<h2> start" + countdown + "</h2>");
    });
  },

  startGame: function() {
    // $(".jumbotron").empty(); here we detach instead
    $("#detachMe").detach();
    var gameStart = $("<div>");
    gameStart.addClass("gameStart");
    $(".jumbotron").append(gameStart);
    // choices.goHome();
    choices.lootStart();
    // console.log("Need better styling")
  }
};

var treasurePile = {
  name: ["Cave Entrance", "Gold Coins", "Gemstones", "Fine Jewelry"],
  images: [
    "assets/img/cave_entranceCA.jpg",
    "assets/img/gold_coins.jpg",
    "assets/img/gems.jpg",
    "assets/img/gold_bahraini.jpg"
  ],
  value: ["0", "1", "3", "5"],
  description: [
    "Get out while you still can!",
    "A handful of gold coins.",
    "A sparkling gemstone.",
    "Jewelry fit for royalty."
  ],
  action: ["Leave", "Min Gain", "Med Gain", "Max Gain"],
  aggravation: [0, 0.05, 0.1, 0.2],
  lootPiles: function() {
    for (var i = 0; i < treasurePile.images.length; i++) {
      var x = [Math.floor(Math.random() * 4)];

      // lootBox.addClass("col-xs-12 col-med-6 col-lg-3");
      var lootCard = $("<div>");
      lootCard.addClass("card text-center");

      var lootImg = $("<img>");
      lootImg.addClass("card-image-top-center");
      lootImg.attr("id", "lootPics");
      lootImg.attr("src", treasurePile.images[x]);
      lootImg.attr("data-value", treasurePile.value[x]);
      $(lootCard).append(lootImg);

      var lootBody = $("<div>");
      lootBody.addClass("card-body");

      var bodyH5 = $("<h5>");
      bodyH5.addClass("card-title");
      bodyH5.text(treasurePile.name[x]);

      var bodyText = $("<p>");
      bodyText.addClass("card-text");
      bodyText.text(treasurePile.description[x]);
      var bodyBtn = $("<button>");
      bodyBtn.addClass("btn btn-primary");
      bodyBtn.attr("data-value", treasurePile.value[x]);
      bodyBtn.attr("id", "next-round");
      bodyBtn.text(treasurePile.action[x]);
      $(lootBody).append(bodyH5, bodyText, bodyBtn);
      $(lootCard).append(lootBody);
      $(".lootBox").append(lootCard);
    }
    $(".btn").on("click", function() {
      var treasureValue = $(this).attr("data-value");
      treasureValue = parseInt(treasureValue);
      roundScore += treasureValue;
      console.log("Treasure Value: " + treasureValue);
      $("#dragonBox").empty();

      if (treasureValue === 0) {
        console.log("Cave Entrance Clicked.");
        if (roundScore > highscore) {
          highscore = roundScore;
          //log to local storage
          localStorage.setItem("highscore", highscore);

          console.log("Is this your first time here?");
          delayButtonAlert = setTimeout(function() {
            alert(
              "New High Score. Take a Screenshot! High Score: " + highscore
            );
            $(".lootBox").empty();
            // $(".jumbotron").empty();
            // $("#dragon").empty();
            roundScore = 0;
            // choices.startGame();
            // makeCanvas();
            $("#detachMe").appendTo(".jumbotron");
          }, 100);
          // $("#highscore").text("High Score: " + highscore)
          //change to local storage
          $("#highscore").text(
            "High Score: " + localStorage.getItem("highscore")
          );

          time.stop();
          countdown = 15;
          danger = 0;
          $("#modal-button").show();
        } else {
          delayButtonAlert = setTimeout(function() {
            alert(
              "You escaped with your treasures. Your score is: " + roundScore
            );
            $(".lootBox").empty();
            $("#dragon").empty();
            roundScore = 0;
            // choices.startGame();
            // makeCanvas();
            $("#detachMe").appendTo(".jumbotron");
          }, 100);
          time.stop();
          countdown = 15;
          danger = 0;
          $("#modal-button").show();
        }
      } else if (treasureValue === 5) {
        console.log("Greedy.");
        threat += 0.2;
        timeLost -= 5;
        time.stop();
        dragon.checkRound();
        time.decrement();
      } else {
        threat += 0.05;
        timeLost -= 10;
        if (roundScore > 10) {
          time.stop();
          dragon.checkRound();
          time.decrement();
        } else {
          time.stop();
          dragon.checkRound();
          console.log("You sneaky bastard.");
        }
      }
      timeLost = 0;

      $(".lootBox").empty();
      // treasurePile.lootPiles();
    });
  },

  lootValue: function() {
    console.log("Nice Click.");
    var treasureValue = $(this).attr("data-value");
    console.log(treasureValue);
  }
};

// (onLoad = choices.startGame()),
//   var highScorefunction() {
//   $("#exampleModalCenter").modal();
//   $("#highScore").text("High Score: " + localStorage.getItem("highscore"));

//   // dragon.countdown();

//   // choices.startGame();
// };
function threatMeter(type, threatBar) {
  dataval = parseInt($(".progress").attr("data-amount"));
  if (type == 1) dataval = Math.min(100, dataval + threatBar);
  else if (type == -1) dataval = Math.max(0, dataval - threatBar);
  $(".progress .amount").css("width", 100 - dataval + "%");
  $(".progress").attr("data-amount", dataval);
}

const makeCanvas = function() {
  const container1 = $("<div>");
  container1.addClass("container text-center");
  const globe = $("<div>");
  globe.addClass("globe");
  const showoff = $("<div>");
  showoff.attr("id", "showoff");
  const container2 = $("<div>");
  container2.addClass("container"); //text center?
  const canvas = $("<canvas>");
  canvas.attr("id", "sphere");
  canvas.attr("width", "400");
  canvas.attr("height", "400");
  const shadows = $("<div>");
  shadows.addClass("earth");
  shadows.attr("id", "glow-shadows");
  const locationHolder = $("<div>");
  locationHolder.attr("id", "locations");
  $(".jumbotron").append(container1);
  $(container1).append(globe);
  $(globe).append(showoff);
  $(showoff).append(container2);
  $(container2).append(canvas);
  $(canvas).append(shadows);
  $(shadows).append(locationHolder);
  $("#sphere").earth3d({
    locationsElement: $("#locations"),
    dragElement: $("#locations"), // where do we catch the mouse drag
    locations: locations
  });
};
