$(function() {
  $("#dialog-2").dialog({
    autoOpen: false,
    buttons: {
      OK: function() {
        $(this).dialog("close");
      }
    },
    title: "Success",
    position: {
      my: "left center",
      at: "left center"
    }
  });
  $("#opener-2").click(function() {
    $("#dialog-2").dialog("open");
  });
});
var currentUser = $("<div>")
    .attr("class", "current-user")
    .text(uN)
    .appendTo(".chatHead"),
  chatBox = $("<ul>")
    .attr({
      id: "messages",
      class: "chat-messages"
    })
    .appendTo(".chatbox"),
  msgBox = $("<input>")
    .attr({
      type: "text",
      id: "messageInput",
      class: "form-control",
      placeholder: "type a message ... press [ENTER] to send"
    })
    .appendTo(".chatbox-data"),
  usersOnline = $("<div>")
    .attr("class", "online-users")
    .text("Online users: ")
    .appendTo(".chatbox-data"),
  spanIcon = $("<span>")
    .attr({
      class: "glyphicon glyphicon-user",
      id: "online-users"
    })
    .appendTo(usersOnline);

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var messageField = $("#messageInput"),
  nameField = $("#nameInput"),
  messageList = $("#messages"),
  onlineList = $("#online-users");

messageField.on("keypress", function(e) {
  if (e.keyCode === 13) {
    var username = uN;
    var message = messageField.val();

    database.ref("/chat").push({ name: username, text: message });
    messageField.val("");
  }
});
database.ref("/chat").on("child_added", function(snapshot) {
  var data = snapshot.val();
  var username = data.name || "anonymous";
  var message = data.text;

  if (username && message) {
    var text = "says";
    var messageElement = $("<li>");
    var nameElement = $("<strong class='name'></strong>");
    nameElement.text(username.concat(" " + text + " "));
    messageElement.text(message).prepend(nameElement);

    messageList.append(messageElement);

    messageList[0].scrollTop = messageList[0].scrollHeight;
  }
});
var listRef = database.ref("/presence");
var userRef = listRef.push();

var presenceRef = database.ref("/.info/connected");
presenceRef.on("value", function(snap) {
  if (snap.val()) {
    userRef.set(true);
    userRef.onDisconnect().remove();
  }
});

listRef.on("value", function(snap) {
  onlineList.text(snap.numChildren());
});
