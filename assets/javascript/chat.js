var nameBox = $("<input>")
    .attr({
      type: "text",
      id: "nameInput",
      class: "form-control",
      placeholder: "enter a username"
    })
    .appendTo(".chatbox"),
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
    .appendTo(".chatbox");
var firebaseConfig = {
  apiKey: "AIzaSyCszCiGMtbfQW3xaAstweYKbib82r0WZF0",
  authDomain: "simple-chat-app-5aaa9.firebaseapp.com",
  databaseURL: "https://simple-chat-app-5aaa9.firebaseio.com",
  projectId: "simple-chat-app-5aaa9",
  storageBucket: "",
  messagingSenderId: "556619862197",
  appId: "1:556619862197:web:bbf2cefddac59566122efc"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var messageField = $("#messageInput"),
  nameField = $("#nameInput"),
  messageList = $("#messages");

messageField.on("keypress", function(e) {
  if (e.keyCode === 13) {
    var username = nameField.val();
    var message = messageField.val();

    database.ref().push({ name: username, text: message });
    messageField.val("");
  }
});
database.ref().on("child_added", function(snapshot) {
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
