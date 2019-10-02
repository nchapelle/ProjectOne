var highscore = 15;
var danger = 0;
var countdown = 150;
var roundScore = 0;
var intervalId;
var threat = 1;
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

    // $(".timer").html("<h2>" + countdown + "</h2>");
    // $(".timer").hide()
    if (countdown === 0) {
      time.stop();

      alert("Time Up!");
      var dragonGO = $("<img>");
      dragonGO.attr("src", dragon.images[1]);
      dragonGO.attr("id", "game-over");
      // $("#dragon").empty();
      $(".jumbotron").empty();
      time.stop();
      roundScore = 0;
      danger = 0;
      countdown = 15;
      $(".jumbotron").append(dragonGO);
      $("#game-over").on("click", function() {
        // $("#dragon").empty();
        $(".jumbotron").empty();
        choices.startGame();
      });
    }
  }
};
var dragon = {
  images: ["assets/img/dragonKnows.gif", "assets/img/gameOver.gif"],

  knows: function() {
    var dragonImg = $("<img>");
    dragonImg.addClass("col");
    dragonImg.attr("src", dragon.images[0]);
    dragonImg.attr("id", "heKnows");
    $(".jumbotron").append(dragonImg);
    $("#heKnows").on("click", function() {
      treasurePile.lootPiles();
    });
  },

  checkRound: function() {
    if (roundScore >= 5) {
      time.stop();
      // $("#dragon").empty();
      dragon.knows();
      danger++;
      console.log("Round Score: " + roundScore);
      console.log("Danger: " + danger);
      countdown = 150 - danger;
      // $(".timer").html("<h2> checkround: " + countdown + "</h2>"); //to let us know what timer is being called
      time.run();
    }
  }
};

var choices = {
  goHome: function() {
    var goHome = $("<div>");
    goHome.addClass("col text-center");
    goHome.attr("data-value", "0");
    goHome.attr("id", "cardBG");
    var goHomeImg = $("<img>");
    goHomeImg.attr("src", "./assets/img/cave_entranceCA.jpg");
    goHomeImg.attr("id", "no-game");
    goHomeImg.attr("data-value", "0");
    $(goHome).append(goHomeImg);
    $(".gameStart").append(goHome);
    $("#no-game").on("click", function() {
      delayButtonAlert = setTimeout(function() {
        alert("You have wasted your opportunity.");
        $(".jumbotron").empty();
        choices.startGame();
      }, 1000);
    });
  },

  lootStart: function() {
    var lootStart = $("<div>");
    lootStart.addClass("col text-center");
    lootStart.attr("data-value", "1");
    lootStart.attr("id", "cardBG");
    var lootStartImg = $("<img>");
    lootStartImg.attr("src", "./assets/img/golden_entry.jpg");
    lootStartImg.attr("id", "Go-Time");
    lootStartImg.attr("data-value", "1");
    $(lootStart).append(lootStartImg);
    $(".gameStart").append(lootStart);
    $("#Go-Time").on("click", function() {
      $(".jumbotron").empty();
      console.log("Correct Choice, game start!");
      treasurePile.lootPiles();
      $("#modal-button").hide();
      time.run();
      time.decrement();
      // $(".timer").html("<h2> start" + countdown + "</h2>");
    });
  },

  startGame: function() {
    $(".jumbotron").empty();
    var gameStart = $("<div>");
    gameStart.addClass("gameStart");
    $(".jumbotron").append(gameStart);
    choices.goHome();
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
    var lootBox = $("<div>");
    lootBox.addClass("lootBox");
    for (var i = 0; i < treasurePile.images.length; i++) {
      var x = [Math.floor(Math.random() * 4)];

      // lootBox.addClass("col-xs-12 col-med-6 col-lg-3");
      var lootCard = $("<div>");
      lootCard.addClass("card text-center");
      $(lootBox).append(lootCard);
      $(".jumbotron").append(lootBox);

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
    }
    $(".btn").on("click", function() {
      var treasureValue = $(this).attr("data-value"); //something is wrong with this function, I believe that values are not being read properly it could be the if/else arguments.
      treasureValue = parseInt(treasureValue);
      roundScore += treasureValue;
      console.log("Treasure Value: " + treasureValue);

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
            $(".jumbotron").empty();
            // $("#dragon").empty();
            roundScore = 0;
            choices.startGame();
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

          // choices.startGame(); //this is now buried within the scope of the second click event
        } else {
          delayButtonAlert = setTimeout(function() {
            alert(
              "You escaped with your treasures. Your score is: " + roundScore
            );
            $(".jumbotron").empty();
            $("#dragon").empty();
            roundScore = 0;
            choices.startGame();
            // choices.startGame(); //this is now buried within the scope of the second click event
          }, 100);
          time.stop();
          countdown = 15;
          danger = 0;
          $("#modal-button").show();
        }
      } else if (treasureValue === 5) {
        console.log("Greedy.");
        danger++;
        time.stop();
        dragon.checkRound();
        time.decrement();
      } else {
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
      $(".jumbotron").empty();
      treasurePile.lootPiles();
    });
  },

  lootValue: function() {
    console.log("Nice Click.");
    var treasureValue = $(this).attr("data-value");
    console.log(treasureValue);
  }
};

// (onLoad = choices.startGame()),
$(document).ready(function() {
  $("#exampleModalCenter").modal();
  $("#highScore").text("High Score: " + localStorage.getItem("highscore"));

  // dragon.countdown();

  // choices.startGame();
});
